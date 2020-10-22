import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Gate from './screens/Gate';

export default function App() {
  return <Gate />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
