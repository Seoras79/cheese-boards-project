const {Sequelize, sequelize} = require('./db');
const {Board} = require('./Board');
const {Cheese} = require('./Cheese');
const {User} = require('./User');

//associate models
User.hasMany(Board); // a user can have many boards
Board.belongsTo(User); // a board belongs to a user
Cheese.belongsToMany(Board, {linky: 'board_cheese'}); //linky is the name of the join table
Board.belongsToMany(Cheese, {linky: 'board_cheese'}); 
Cheese.belongsToMany(User, {linky: 'user_cheese'});


module.exports = {
    Sequelize,
    sequelize,
    Board,
    Cheese,
    User
};
