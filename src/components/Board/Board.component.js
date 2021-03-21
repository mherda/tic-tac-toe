import React from 'react';
import { useState, useEffect } from 'react';
import './Board.stylesheet.css';

const Board = () => {
  const [squares, setSquares] = useState(
    // () => Lazy loading of initial state
    () =>
      JSON.parse(window.localStorage.getItem('squares')) || Array(9).fill(null),Array(9).fill(null)
  );

  useEffect(() => {
    window.localStorage.setItem('squares', JSON.stringify(squares))
  }, [squares])

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function restart() {
    setSquares(Array(9).fill(null))
  }


  function selectSquare(square) {
    if (winner || squares[square]) {
      return
    }
    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    setSquares(squaresCopy)
  }

  function calculateNextValue(squares) {
    const xSquaresCount = squares.filter(r => r === 'X').length
    const oSquaresCount = squares.filter(r => r === 'O').length
    return oSquaresCount === xSquaresCount ? 'X' : 'O'
  }

  function calculateStatus(winner, squares, nextValue) {
    return winner
      ? `Winner: ${winner}`
      : squares.every(Boolean)
        ? `Draw`
        : `Next player: ${nextValue}`
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (

    <div className="game">
      <div className="status">
        <h1>{status}</h1>
      </div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="restart" onClick={restart}>
        RESET
      </button>
    </div>
  );
};

export default Board;