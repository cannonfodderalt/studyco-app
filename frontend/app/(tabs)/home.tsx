import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';

export default function HomeScreen() {

  return (
    <View style={[styles.container, { backgroundColor: '#BFDBFE' }]}>
      <Text style={styles.greeting}>Hi</Text>
      <Text style={styles.subtext}>This is a home screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#666',
  },
});
