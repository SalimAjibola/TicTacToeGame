import React from 'react';
import { View, StyleSheet } from 'react-native';
import TicTacToe from './TicTacToe';

export default function App() {
  return (
    <View style={styles.container}>
      <TicTacToe />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
