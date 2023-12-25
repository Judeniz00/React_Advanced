import React from 'react';
import './styles.css';

class OyunTahtasi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winnerLine: [],
      winner: null,
    };
  }

  renderSquare(i) {
    const isWinnerSquare = this.state.winnerLine.includes(i);
    return (
      <button
      className={`square ${this.state.squares[i] ? 'filled' : ''} ${
        isWinnerSquare ? 'winner-square winner-highlight' : ''
      }`}
        onClick={() => this.handleClick(i)}
      >
        {this.state.squares[i]}
      </button>
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const winner = this.calculateWinner(squares);
    const winnerLine = winner ? this.getWinnerLine() : [];
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      winnerLine: winnerLine,
      winner: winner,
    });

    if (winner || squares.every(square => square !== null)) {
      setTimeout(() => {
        this.setState({
          squares: Array(9).fill(null),
          xIsNext: true,
          winnerLine: [],
          winner: null,
        });
      }, 3000); // 3 saniye bekleyecek
    }
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  getWinnerLine() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const squares = this.state.squares;
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return lines[i];
      }
    }
    return [];
  }

  render() {
    const winner = this.state.winner;
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
  
    return (
      <div>
        <div className="game-title">XOX Oyunu</div>
        <div className="next-player">Next player: {this.state.xIsNext ? 'X' : 'O'}</div>
        <div className="board">
          {[0, 1, 2].map((row) => (
            <div className="board-row" key={row}>
              {[0, 1, 2].map((col) =>
                this.renderSquare(row * 3 + col)
              )}
            </div>
          ))}
          {/* Kazanma efekti */}
          {this.state.winnerLine.length > 0 && (
            <div className="win-effect">
              <div className="win-message">
                <span className={`winner ${winner === 'X' ? 'red-text' : 'blue-text'}`}>{winner}</span> Wins!
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
}

export default OyunTahtasi;
