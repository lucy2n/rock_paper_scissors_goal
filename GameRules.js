class GameRules {
    constructor(moves) {
        this.moves = moves;
        this.numMoves = moves.length;
    }

    getWinner(playerMove, computerMove) {
        const playerIndex = this.moves.indexOf(playerMove);
        const computerIndex = this.moves.indexOf(computerMove);
        const half = Math.floor(this.numMoves / 2);

        if (playerIndex === computerIndex) {
            return 'Draw';
        }

        const winningMoves = [];
        for (let i = 1; i <= half; i++) {
            winningMoves.push(this.moves[(playerIndex + i) % this.numMoves]);
        }

        return winningMoves.includes(computerMove) ? 'You win!' : 'Computer wins!';
    }
}

module.exports = GameRules;