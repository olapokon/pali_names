const express = require("express");
const next = require("next");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const { sequelize, Name } = require("./database");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(helmet());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.post("/search", function(req, res) {
    console.log(req.body);
    let { searchInput, searchType, limit } = req.body;
    let orSearchInput;
    searchInput = searchInput.toLowerCase();

    // sqlite does not support case-insensitive queries for unicode characters
    if (searchType === "startswith") {
      searchInput = searchInput[0].toUpperCase() + searchInput.slice(1) + "%";
    } else if (searchType === "substring") {
      if (
        searchInput[0] === "ā" ||
        searchInput[0] === "ū" ||
        searchInput[0] === "ī" ||
        searchInput[0] === "ñ"
      ) {
        orSearchInput =
          "%" + searchInput[0].toUpperCase() + searchInput.slice(1) + "%";
      }
      searchInput = "%" + searchInput + "%";
    } else if (searchType === "endswith") {
      searchInput = "%" + searchInput;
    }

    if (orSearchInput) {
      query = {
        [Sequelize.Op.or]: [
          {
            name: sequelize.where(sequelize.col("name"), "LIKE", searchInput)
          },
          {
            name: sequelize.where(sequelize.col("name"), "LIKE", orSearchInput)
          }
        ]
      };
    } else {
      query = {
        name: sequelize.where(sequelize.col("name"), "LIKE", searchInput)
      };
    }

    const searchParameters = {
      attributes: ["id", "name", "link"],
      where: query
    };

    if (limit) {
      searchParameters.limit = limit;
    }

    Name.findAll(searchParameters)
      .then(names => {
        return res.json(JSON.stringify(names));
      })
      .catch(error => {
        return res.json({ error: error.message });
      });
  });
  server.all("*", function(req, res) {
    return handle(req, res);
  });

  server.listen(PORT, function(error) {
    if (error) throw error;
    console.log(`Server listening on port ${PORT}`);
  });
});
