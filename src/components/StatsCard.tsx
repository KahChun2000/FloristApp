import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = {
  credit: number;
  points: number;
  packageCount: number;
  onPress: () => void;
};

export default function StatsCard(props: Props) {
  return (
    <View style={styles.card}>
      <Pressable style={styles.column} onPress={props.onPress}>
        <Text style={styles.label}>CREDIT</Text>
        <Text style={styles.value}>RM{props.credit.toFixed(2)}</Text>
      </Pressable>
      <View style={styles.divider} />
      <Pressable style={styles.column} onPress={props.onPress}>
        <Text style={styles.label}>POINTS</Text>
        <Text style={styles.value}>{props.points}</Text>
      </Pressable>
      <View style={styles.divider} />
      <Pressable style={styles.column} onPress={props.onPress}>
        <Text style={styles.label}>PACKAGE</Text>
        <Text style={styles.value}>{props.packageCount}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 22,
    height: 44,
    marginTop: 12,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: colors.inactive,
  },
  label: {
    fontSize: 8,
    fontWeight: '500',
    color: colors.primary,
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 2,
  },
});
