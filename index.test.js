const {Sequelize, sequelize} = require('./db');

//require in all model files
const {Board} = require('./Board');
const {Cheese} = require('./Cheese');
const {User} = require('./User');

describe('Models', () => {
    //create test data
    const cheeseData = {
        title: 'Cheddar',
        description: 'Mature cheddar'
    };

    const userData = {
        username: 'testuser',
        email: 'someuser@email.com'
    };
    const boardData = {
        type: 'test',
        description: 'test board',
        rating: 5
    };

    beforeAll(async () => {
        await sequelize.sync({force: true});
    })

    test('Cheese model', async () => {
        //create instance of cheese model
        const cheese = await Cheese.create(cheeseData);
        //test cheese title is a string
        expect(cheese).toBeInstanceOf(Cheese);
        expect(cheese).toHaveProperty('title');
        expect(cheese).toHaveProperty('description');

        
    });
    test('User model', async () => {
        //create instance of user model
        const user = await User.create(userData);
        //test user
        expect(user).toBeInstanceOf(User);
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('email');
    });
    test('Board model', async () => {
        //create instance of board model
        const board = await Board.create(boardData);
        //test board
        expect(board).toBeInstanceOf(Board);
        expect(board).toHaveProperty('type');
        expect(board).toHaveProperty('description');
        expect(board).toHaveProperty('rating');
    });

})

