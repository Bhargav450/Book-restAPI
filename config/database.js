const { Sequelize } = require('sequelize');





const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  });

// const sequelize = new Sequelize('supply_chain_management_db', 'root', '56281220', {
//   host: 'localhost',
//   dialect: 'mysql',
// });



sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });




  
module.exports =  sequelize ;