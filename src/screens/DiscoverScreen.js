import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { categories } from '../data/categories';
import { posts } from '../data/posts';
import { colors } from '../theme';
import ScreenHeader from '../components/ScreenHeader';
import TwoColumnPosts from '../components/TwoColumnPosts';

export default function DiscoverScreen({ navigation }) {
  const [categoryId, setCategoryId] = useState(undefined);

  let visiblePosts = posts;
  if (categoryId) {
    visiblePosts = posts.filter(post => post.categoryId === categoryId);
  }

  const chips = [{ id: undefined, name: 'All' }, ...categories];

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Discover" />
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {chips.map(chip => {
            const selected = chip.id === categoryId;
            return (
              <Pressable
                key={chip.name}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setCategoryId(chip.id)}
              >
                <Text
                  style={[styles.chipText, selected && styles.chipTextSelected]}
                >
                  {chip.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        <TwoColumnPosts
          posts={visiblePosts}
          onOpenPost={postId => navigation.navigate('PostDetail', { postId })}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  chips: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: colors.white,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: colors.grey,
  },
  chipTextSelected: {
    color: colors.white,
  },
  list: {
    paddingBottom: 24,
  },
});
