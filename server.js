const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const Sequelize = require("sequelize");
const sequelize = new Sequelize("pali_names", null, null, {
  dialect: "sqlite",
  storage: "./pali_names_database"
});
sequelize
  .authenticate()
  .then(() => console.log("Connected to the database"))
  .catch(error => console.error("Error connecting to the databse: ", error));
const Name = sequelize.define(
  "name",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    link: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {}
);

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.post("/search", function(req, res) {
    Name.findAll({
      attributes: ["name", "link"],
      where: {
        name: {
          [Sequelize.Op.startsWith]: "ariya"
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
  server.get("*", function(req, res) {
    return handle(req, res);
  });

  server.listen(PORT, function(error) {
    if (error) throw error;
    console.log(`Server listening on port ${PORT}`);
  });
});
