const fetch = require("isomorphic-unfetch");
const cheerio = require("cheerio");
const { sequelize, Name } = require("./database");

sequelize.sync({ force: true });

const rootUrl = "http://www.palikanon.com/english/pali_names/";

async function getPages(url) {
  console.log("running getPages");

  // get the page for each letter of the dicitionary from the main page
  const data = await (await fetch(`${url}dic_idx.html`)).text();
  const $ = cheerio.load(data);

  const letterPages = [];
  $("b > a").map(function(i, el) {
    const pageLink = $(el).attr("href");
    return letterPages.push({
      letterUrlSegment: pageLink.slice(0, pageLink.indexOf("/") + 1),
      pageUrlSegment: pageLink.slice(pageLink.indexOf("/") + 1)
    });
  });

  // for each letter page, get additional pages for the letter, if any
  const pages = [];
  for (page of letterPages) {
    pages.push(page);

    const data = await (await fetch(
      `${url}${page.letterUrlSegment}${page.pageUrlSegment}`
    )).text();
    const $ = cheerio.load(data);
    $("td")
      .find("a")
      .map(function(i, el) {
        pages.push({
          letterUrlSegment: page.letterUrlSegment,
          pageUrlSegment: $(el).attr("href")
        });
      });
  }

  return pages;
}

// this function takes a url in there pieces, e.g.
// `http://www.palikanon.com/english/pali_names/`, `aa/`, `a1_ad.htm`
async function getHTML(rootUrl, letterUrl, pageUrl) {
  console.log(`running getHTML for ${rootUrl}${letterUrl}${pageUrl}`);
  console.log(`letterUrl = ${letterUrl}`);
  console.log(`pageUrl = ${pageUrl}`);
  const data = await (await fetch(`${rootUrl}${letterUrl}${pageUrl}`)).text();
  const $ = cheerio.load(data);

  const namesArray = [];
  // returning an array of objects { name: '', link: ''} to be used for bulkCreate into the database
  $("li > b").map(function(i, el) {
    // if the name has it's own page, get the link to that page,
    // otherwise, get the link to the page of the dictionary
    let link = rootUrl + letterUrl + pageUrl;
    if (
      $(el).find("a").length > 0 &&
      $(el)
        .find("a")
        .attr("href")
    ) {
      link = $(el)
        .find("a")
        .attr("href");

      // links are not of consistent format on the website, need to account for the different possibilities
      if (link[0] === ".") {
        link = rootUrl + link.slice(3);
      } else if (pageUrl === "../maha/maha.htm") {
        link = rootUrl + "maha/" + link;
      } else {
        link = rootUrl + letterUrl + link;
      }
    }

    return namesArray.push({
      name: $(el)
        .text()
        .trim(),
      link
    });
  });
  return namesArray;
}

async function createDatabase(url) {
  let pages;
  try {
    pages = await getPages(url);
  } catch (error) {
    console.error(error.message);
    return;
  }

  for (page of pages) {
    let onePageData;
    try {
      onePageData = await getHTML(
        rootUrl,
        page.letterUrlSegment,
        page.pageUrlSegment
      );
      // save all the names in the page into the database in bulk
      Name.bulkCreate(onePageData);
    } catch (error) {
      console.error(error.message);
      console.log(
        `scraping failed at http://www.palikanon.com/english/pali_names/${page.letterUrlSegment}${page.pageUrlSegment} due to an error`
      );
    }
  }
}

createDatabase(rootUrl);
