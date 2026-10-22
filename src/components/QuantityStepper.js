import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export default function QuantityStepper({ value, onDecrease, onIncrease }) {
  return (
    <View style={styles.row}>
      <Pressable
        style={styles.button}
        onPress={onDecrease}
        accessibilityLabel="Decrease quantity"
      >
        <Text style={styles.sign}>−</Text>
      </Pressable>
      <Text style={styles.value}>{value}</Text>
      <Pressable
        style={styles.button}
        onPress={onIncrease}
        accessibilityLabel="Increase quantity"
      >
        <Text style={styles.sign}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sign: {
    fontSize: 16,
    color: colors.button,
  },
  value: {
    minWidth: 32,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: 20
  },
});
