const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming your database setup is in the config folder

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  publicationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});


Book.sync({ alter: false })
  .then(() => {
    console.log("Book table created (if not already present).");
  })
  .catch((err) => {
    console.error("Error creating Book table:", err);
  });

module.exports = Book;
