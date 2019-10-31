const fetch = require("isomorphic-unfetch");
const cheerio = require("cheerio");
const { sequelize, Name } = require("./database");

sequelize.sync({ force: true });

const url = "http://www.palikanon.com/english/pali_names/";

async function getPages(url) {
  console.log("running getPages");

  // get the page for each letter of the dicitionary from the main page
  const data = await (await fetch(`${url}dic_idx.html`)).text();
  const $ = cheerio.load(data);

  const letterPages = [];
  $("b > a").map(function(i, el) {
    return letterPages.push($(el).attr("href"));
  });

  // for each letter page, get additional pages for the letter, if any
  const pages = [];
  for (page of letterPages) {
    pages.push(page);

    const data = await (await fetch(`${url}${page}`)).text();
    const $ = cheerio.load(data);
    // keep the uri segment for the letter in question, on which the subpage uris are appended
    const uriSegment = page.slice(0, page.indexOf("/") + 1);
    $("td")
      .find("a")
      .map(function(i, el) {
        pages.push(`${uriSegment}${$(el).attr("href")}`);
      });
  }

  // return the addresses of all the pages in the dictionary
  return pages;
}

async function getHTML(url) {
  console.log("running getHTML");
  const data = await (await fetch(url)).text();
  const $ = cheerio.load(data);

  const namesArray = [];
  // returning an array of objects { name: '', link: ''} to be used for bulkCreate into the database
  $("li > b").map(function(i, el) {
    return namesArray.push({
      name: $(el)
        .text()
        .trim(),
      link: url
    });
  });

  // return all the dictionary entries in this page
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
        `http://www.palikanon.com/english/pali_names/${page}`
      );
      // save all the names in the page into the database in bulk
      Name.bulkCreate(onePageData);
    } catch (error) {
      console.log(
        `scraping failed at http://www.palikanon.com/english/pali_names/${page} due to an error`
      );
      console.error(error.message);
    }
  }
}

createDatabase(url);
