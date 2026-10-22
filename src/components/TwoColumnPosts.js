import React from 'react';
import { StyleSheet, View } from 'react-native';

import TrendingCard from './TrendingCard';

export default function TwoColumnPosts({ posts, onOpenPost }) {
  const leftPosts = posts.filter((post, index) => index % 2 === 0);
  const rightPosts = posts.filter((post, index) => index % 2 === 1);

  return (
    <View style={styles.columns}>
      <View style={styles.column}>
        {leftPosts.map(post => (
          <TrendingCard
            key={post.id}
            post={post}
            onPress={() => onOpenPost(post.id)}
          />
        ))}
      </View>
      <View style={styles.column}>
        {rightPosts.map(post => (
          <TrendingCard
            key={post.id}
            post={post}
            onPress={() => onOpenPost(post.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  columns: {
    flexDirection: 'row',
    paddingHorizontal: 18,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
});
