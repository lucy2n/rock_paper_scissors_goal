const Game = require('./game');

const args = process.argv.slice(2);
const game = new Game(args);
game.start();