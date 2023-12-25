import React from 'react';
import './styles.css';

class OyunTahtasi extends React.Component {
  constructor(props) {
    super(props);
    // Oyun durumu ve değişkenleri
    this.state = {
      squares: Array(9).fill(null), // 3x3'lük oyun tahtasını temsil eden kareler
      xIsNext: true, // Sıradaki oyuncuyu belirten değişken (X mi, O mu)
      winnerLine: [], // Kazanan kombinasyonunun indekslerini içeren dizi
      winner: null, // Oyunun kazananını tutan değişken (X mi, O mu)
    };
  }

  // Kare oluşturma işlevi
  renderSquare(i) {
    const isWinnerSquare = this.state.winnerLine.includes(i); // Kazanan kare mi?
    return (
      <button
        className={`square ${this.state.squares[i] ? 'filled' : ''} ${
          isWinnerSquare ? 'winner-square winner-highlight' : ''
        }`}
        onClick={() => this.handleClick(i)} // Kareye tıklama işlemi
      >
        {this.state.squares[i]} {/* Karedeki içerik (X, O veya boş) */}
      </button>
    );
  }

  // Kare tıklama işlevi
  handleClick(i) {
    const squares = this.state.squares.slice(); // Tahtanın mevcut durumunu kopyala
    // Oyunun bitip bitmediğini veya kare doluysa işlem yapma
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; // Kareye X ya da O ekle
    const winner = this.calculateWinner(squares); // Kazanan var mı?
    const winnerLine = winner ? this.getWinnerLine() : []; // Kazanan kombinasyonunun indekslerini al
    // Oyun durumunu güncelle
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext, // Sıradaki oyuncuyu değiştir
      winnerLine: winnerLine,
      winner: winner,
    });

    // Oyunun bitip bitmediğini kontrol et
    if (winner || squares.every(square => square !== null)) {
      // Oyunu sıfırla ve yeni oyunu başlat (3 saniye bekleyerek)
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

  // Kazananı hesaplayan işlev
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
    // Kazananı kontrol et
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
    return null; // Kazanan yok
  }

  // Kazanan kombinasyonunu bulan işlev
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
    // Kazanan kombinasyonunu bul
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
    return []; // Kazanan kombinasyonu yok
  }

  render() {
    const winner = this.state.winner;
    let status;
    // Kazanan var mı yok mu kontrol et
    if (winner) {
      status = 'Winner: ' + winner; // Kazananı göster
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); // Sıradaki oyuncuyu göster
    }
  
    return (
      <div>
        <div className="game-title">XOX Oyunu</div> {/* Oyun başlığı */}
        <div className="next-player">Next player: {this.state.xIsNext ? 'X' : 'O'}</div> {/* Sıradaki oyuncuyu gösteren alan */}
        <div className="board">
          {[0, 1, 2].map((row) => (
            <div className="board-row" key={row}>
              {[0, 1, 2].map((col) =>
                this.renderSquare(row * 3 + col) // Kareleri oluştur
              )}
            </div>
          ))}
          {/* Kazanan olduğunda gösterilecek kazanma efekti */}
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

export default OyunTahtasi; // Oyun tahtasını dışa aktar
