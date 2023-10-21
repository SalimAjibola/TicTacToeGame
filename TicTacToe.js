// TicTacToe.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  const calculateWinner = (squares) => {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const handleWin = (winner) => {
    if (winner === 'X') {
      setXWins(xWins + 1);
    } else if (winner === 'O') {
      setOWins(oWins + 1);
    }
  };

  const handleClick = (i) => {
    if (winner || board[i]) {
      return;
    }
    const squares = [...board];
    squares[i] = xIsNext ? 'X' : 'O';
    setBoard(squares);
    setXIsNext(!xIsNext);

    const currentWinner = calculateWinner(squares);
    if (currentWinner) {
      setWinner(currentWinner);
      handleWin(currentWinner);
    } else if (squares.every((square) => square)) {
      // It's a draw
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const renderSquare = (i) => (
    <Animatable.View animation={winner ? 'bounceIn' : ''}>
      <TouchableOpacity
        style={styles.square}
        onPress={() => handleClick(i)}
        disabled={board[i] || winner}>
        <Text style={styles.squareText}>{board[i]}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View>
      <View style={styles.status}>
        {winner ? (
          <Text>
            {winner === 'Draw' ? "It's a draw!" : `Winner: ${winner}`}
          </Text>
        ) : (
          <Text>{`Next player: ${xIsNext ? 'X' : 'O'}`}</Text>
        )}
      </View>
      <View style={styles.board}>
        <View style={styles.boardRow}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.boardRow}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.boardRow}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      {winner && (
        <Button title="Start a New Game" onPress={resetGame} />
      )}
      <Button
        title="Reset Wins"
        onPress={() => {
          setXWins(0);
          setOWins(0);
        }}
      />
      <Text>X Wins: {xWins}</Text>
      <Text>O Wins: {oWins}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    marginBottom: 10,
    alignItems: 'center',
  },
  board: {
    flexDirection: 'column',
  },
  boardRow: {
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 24,
  },
});

export default TicTacToe;
