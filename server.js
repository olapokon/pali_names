const express = require("express");
const next = require("next");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");

const { Name } = require("./database");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.post("/search", function(req, res) {
    console.log(req.body);
    const { searchInput } = req.body;
    Name.findAll({
      attributes: ["id", "name", "link"],
      where: {
        name: {
          [Sequelize.Op.substring]: searchInput
        }
      }
    })
      .then(names => {
        console.log(JSON.stringify(names));
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
