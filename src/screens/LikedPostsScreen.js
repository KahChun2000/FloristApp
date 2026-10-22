import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useApp } from '../context/AppContext';
import { posts } from '../data/posts';
import { colors } from '../theme';
import ScreenHeader from '../components/ScreenHeader';

export default function LikedPostsScreen({ navigation }) {
  const { likedPostIds } = useApp();
  const likedPosts = posts.filter(post => likedPostIds.includes(post.id));

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Liked Posts" onBack={() => navigation.goBack()} />
      <FlatList
        data={likedPosts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No liked posts yet</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() =>
              navigation.navigate('PostDetail', { postId: item.id })
            }
          >
            <Image
              source={require('../assets/images/product.jpg')}
              style={styles.thumb}
            />
            <View style={styles.info}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  category: {
    fontSize: 12,
    color: colors.grey,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  empty: {
    textAlign: 'center',
    color: colors.grey,
    fontSize: 15,
    marginTop: 80,
  },
});
