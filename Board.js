const {Sequelize, sequelize} = require('./db');

//create Board model
const Board = sequelize.define('board', {
    type : Sequelize.STRING,
    description: Sequelize.STRING,
    rating: Sequelize.INTEGER
});

module.exports = {
    Board
};