const {Sequelize, sequelize} = require('./db');

//create Cheese model
const Cheese = sequelize.define('cheese', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
});

module.exports = {
    Cheese
};