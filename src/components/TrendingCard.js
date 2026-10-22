import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../theme';

export default function TrendingCard({ post, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={require('../assets/images/product.jpg')}
        style={styles.image}
        resizeMode='cover'
      />
      <Text style={styles.category}>{post.category}</Text>
      <Text style={styles.title}>{post.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
    paddingBottom: 14,
  },
  image: {
    width: '100%',
  },
  category: {
    fontSize: 11,
    color: colors.grey,
    marginTop: 12,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
    marginTop: 4,
    marginHorizontal: 12,
    lineHeight: 20,
  },
});
