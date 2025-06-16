const { Sequelize } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize('authdb', 'postgres', 'maadi226i', {
  host: 'localhost',
  dialect: 'postgres',
});

// Import models and initialize with sequelize
const User = require('./user.model')(sequelize);

// Export sequelize instance and models
module.exports = {
  sequelize,
  User,
};
