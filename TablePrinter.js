const Table = require('cli-table3');

class TablePrinter {
    constructor(moves) {
        this.moves = moves;
    }

    printMovesTable(gameRules) {
        const table = new Table({
            head: ['v PC/User >', ...this.moves],
            colWidths: new Array(this.moves.length + 1).fill(15)
        });

        this.moves.forEach((move, i) => {
            const row = [move];
            this.moves.forEach((_, j) => {
                if (i === j) {
                    row.push('Draw');
                } else {
                    const result = gameRules.getWinner(this.moves[i], this.moves[j]);
                    row.push(result === 'You win!' ? 'Win' : 'Lose');
                }
            });
            table.push(row);
        });

        console.log(table.toString());
    }
}

module.exports = TablePrinter;