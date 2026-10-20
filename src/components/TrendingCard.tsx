import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { Post } from '../data/posts';
import { colors } from '../theme';

type Props = {
  post: Post;
  onPress: () => void;
};

export default function TrendingCard({ post, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={require('../assets/images/product.jpg')}
        style={styles.image}
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
    aspectRatio: 1,
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
