const Sequelize = require("sequelize");

const sequelize = new Sequelize("pali_names", null, null, {
  dialect: "sqlite",
  storage: "./pali_names_database"
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to the database"))
  .catch(error => console.error("Error connecting to the database: ", error));

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

module.exports = {
  sequelize,
  Name
};
