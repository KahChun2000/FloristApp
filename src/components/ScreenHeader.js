import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

export default function ScreenHeader({ title, onBack, right }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
      <View style={styles.side}>
        {onBack ? (
          <Pressable onPress={onBack} accessibilityLabel="Back" hitSlop={12}>
            <Image
              source={require('../assets/images/icon-back.png')}
              style={styles.backIcon}
            />
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  side: {
    width: 80,
  },
  right: {
    alignItems: 'flex-end',
  },
  backIcon: {
    width: 10,
    height: 18,
    tintColor: colors.white,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
});
