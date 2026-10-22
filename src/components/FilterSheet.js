import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

const sortOptions = [
  { value: 'default', label: 'Recommended' },
  { value: 'low', label: 'Price: Low to High' },
  { value: 'high', label: 'Price: High to Low' },
];

export default function FilterSheet(props) {
  const insets = useSafeAreaInsets();
  const [sort, setSort] = useState(props.sort);
  const [saleOnly, setSaleOnly] = useState(props.saleOnly);

  function reset() {
    setSort('default');
    setSaleOnly(false);
  }

  return (
    <Modal
      visible
      transparent
      animationType="slide"
      onRequestClose={props.onClose}
    >
      <Pressable style={styles.backdrop} onPress={props.onClose} />
      <View
        testID="filter-sheet"
        style={[styles.sheet, { paddingBottom: insets.bottom + 24 }]}
      >
        <View style={styles.headerRow}>
          <Text style={styles.title}>Filter</Text>
          <Pressable onPress={reset}>
            <Text style={styles.reset}>Reset</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionLabel}>SORT BY</Text>
        {sortOptions.map(option => {
          const selected = option.value === sort;
          return (
            <Pressable
              key={option.value}
              style={styles.optionRow}
              onPress={() => setSort(option.value)}
            >
              <Text style={[styles.optionText, selected && styles.selected]}>
                {option.label}
              </Text>
              <View style={[styles.radio, selected && styles.radioOn]} />
            </Pressable>
          );
        })}

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>On sale only</Text>
          <Switch
            accessibilityLabel="On sale only"
            value={saleOnly}
            onValueChange={setSaleOnly}
            trackColor={{ true: colors.button, false: colors.inactive }}
          />
        </View>

        <Pressable
          style={styles.applyButton}
          onPress={() => props.onApply(sort, saleOnly)}
        >
          <Text style={styles.applyText}>Apply</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  reset: {
    fontSize: 14,
    color: colors.grey,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.grey,
    marginTop: 20,
    marginBottom: 4,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  optionText: {
    fontSize: 15,
    color: colors.text,
  },
  selected: {
    color: colors.primary,
    fontWeight: '700',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.inactive,
  },
  radioOn: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  applyButton: {
    backgroundColor: colors.button,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  applyText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
