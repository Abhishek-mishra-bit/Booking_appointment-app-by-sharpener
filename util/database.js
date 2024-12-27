const Sequelize = require("sequelize");

const sequelize = new Sequelize("todo_db", "root", "Abhishek@123", {
  dialect: "mysql",
  host: "localhost",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.error("Error connecting to the database:", err));

module.exports = sequelize;
