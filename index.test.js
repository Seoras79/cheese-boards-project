//require database connection
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
    const cheeseData2 = {
        title: 'Goats Cheese',
        description: 'Soft Cheese',
    };
    const cheeseData3 = {
        title: 'Cream Cheese',
        description: 'Soft Cheese',
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
    const boardData2 = {
        type: 'test2',
        description: 'test board2',
        rating: 4
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
    test('more than one board can be added to User', async () => {  
        //find all boards
        const boards = await Board.findAll();
        //create instance of user model
        const user = await User.create(userData);
        function newFunction() {
            foundUser.getBoards().then(boards => {
                expect(boards).toHaveLength(2);
            });
        }
    });


    test('Board can have many cheeses and cheeses can be on many boards', async () => {
        //find all cheeses
        const cheeses = await Cheese.findAll();
        //create instance of board model
        const board = await Board.create(boardData);
        //associate cheeses with board
        await board.addCheeses([cheeseData, cheeseData2, cheeseData3]);
        //find board and get cheeses
        const foundBoard = await Board.findByPk(board.id);
        const foundCheeses = await foundBoard.getCheeses();
        //test cheeses
        expect(foundCheeses).toHaveLength(3);
        expect(foundCheeses[0]).toHaveProperty('title');
        expect(foundCheeses[0]).toHaveProperty('description');
        expect(foundCheeses[0]).toHaveProperty('boards');
    });
    test('A cheese can be loaded with its board data', async () => {
        //find all cheeses
        const cheeses = await Cheese.findAll();
        //create instance of board model
        const board = await Board.create(boardData);
        //associate cheeses with board
        await board.addCheeses(cheeses);
        //find board and get cheeses
        const foundBoard = await Board.findByPk(board.id);
        const foundCheeses = await foundBoard.getCheeses();
        //test cheeses
        expect(foundCheeses).toHaveLength(3);
        expect(foundCheeses[0]).toHaveProperty('title');
        expect(foundCheeses[0]).toHaveProperty('description');
        expect(foundCheeses[0]).toHaveProperty('boards');
    });
        


});

