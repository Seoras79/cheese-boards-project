const {Sequelize, sequelize} = require('./db');

//create User model
const User = sequelize.define('user', {
    username: Sequelize.STRING,
    email: Sequelize.STRING
});

module.exports = {
    User
};

