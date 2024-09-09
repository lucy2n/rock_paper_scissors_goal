const readline = require('readline');
const KeyGenerator = require('./KeyGenerator');
const TablePrinter = require('./TablePrinter');
const GameRules = require('./GameRules');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Game {
    constructor(moves) {
        this.moves = moves;
        this.keyGenerator = KeyGenerator;
        this.gameRules = new GameRules(moves);
        this.tablePrinter = new TablePrinter(moves);
    }

    start() {
        this.validateInputs(this.moves);

        const secretKey = this.keyGenerator.generateSecretKey();
        const computerMove = this.moves[Math.floor(Math.random() * this.moves.length)];
        const hmac = this.keyGenerator.generateHMAC(secretKey, computerMove);

        console.log(`HMAC: ${hmac}`);

        console.log('Available moves:');
        this.moves.forEach((move, index) => {
            console.log(`${index + 1} - ${move.toLowerCase()}`);
        });
        console.log('0 - exit');
        console.log('? - help');

        rl.question('Enter your move: ', (playerChoice) => {
            if (playerChoice === '0') {
                console.log('Goodbye!');
                rl.close();
                process.exit(0);
            }

            if (playerChoice === '?') {
                console.log('Game rules table:');
                this.tablePrinter.printMovesTable(this.gameRules);
                return this.start();
            }

            const playerIndex = parseInt(playerChoice, 10) - 1;

            if (isNaN(playerIndex) || playerIndex < 0 || playerIndex >= this.moves.length) {
                console.error('Invalid move. Please try again.');
                rl.close();
                process.exit(1);
            }

            const playerMove = this.moves[playerIndex];
            console.log(`Your move: ${playerMove}`);
            console.log(`Computer's move: ${computerMove}`);

            const result = this.gameRules.getWinner(playerMove, computerMove);
            console.log(result);

            console.log(`HMAC key: ${secretKey}`);
            rl.close();
        });
    }

    validateInputs(moves) {
        if (moves.length < 3) {
            console.error('Error: You must provide at least 3 moves.');
            console.log('Example: node index.js Rock Scissors Paper');
            process.exit(1);
        }
        
        if (moves.length % 2 === 0) {
            console.error('Error: The number of moves must be odd.');
            console.log('Example: node index.js Rock Scissors Paper');
            process.exit(1);
        }
        
        const uniqueMoves = new Set(moves);
        if (uniqueMoves.size !== moves.length) {
            console.error('Error: Moves must not be repeated');
            console.log('Example: node index.js Rock Scissors Paper');
            process.exit(1);
        }
    }
}

module.exports = Game;