const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(
    process.env.DEPLOYMENT_URL, 
    {
      dialect: 'mysql'
    }
  );
   // Test the connection in production
   sequelize.authenticate()
   .then(() => console.log('Connection has been established successfully.'))
   .catch((err) => console.error('Unable to connect to the database:', err));
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;