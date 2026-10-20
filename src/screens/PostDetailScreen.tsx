import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackScreenProps } from '../navigation/types';
import { useApp } from '../context/AppContext';
import { getPost } from '../data/posts';
import { colors } from '../theme';
import ScreenHeader from '../components/ScreenHeader';

export default function PostDetailScreen({
  navigation,
  route,
}: StackScreenProps<'PostDetail'>) {
  const { likedPostIds, toggleLike } = useApp();

  const post = getPost(route.params.postId);
  if (!post) {
    return null;
  }

  const liked = likedPostIds.includes(post.id);
  const likeCount = post.likes + (liked ? 1 : 0);

  function share() {
    if (post) {
      Share.share({ message: post.title });
    }
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Discovery" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={require('../assets/images/product.jpg')}
          style={styles.image}
        />
        <View style={styles.body}>
          <Text style={styles.category}>{post.category}</Text>
          <Text style={styles.title}>{post.title}</Text>

          <View style={styles.actions}>
            <Pressable
              style={[styles.actionButton, liked && styles.likedButton]}
              onPress={() => toggleLike(post.id)}
            >
              <Text style={[styles.actionText, liked && styles.likedText]}>
                {liked ? '♥ Liked' : '♡ Like'}
              </Text>
            </Pressable>
            <Text style={styles.likeCount}>{likeCount + ' likes'}</Text>
            <Pressable style={styles.actionButton} onPress={share}>
              <Text style={styles.actionText}>Share</Text>
            </Pressable>
          </View>

          <Text style={styles.text}>{post.body}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    aspectRatio: 1.2,
  },
  body: {
    padding: 20,
  },
  category: {
    fontSize: 12,
    color: colors.grey,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 6,
    lineHeight: 26,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  actionButton: {
    borderWidth: 1,
    borderColor: colors.button,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  likedButton: {
    backgroundColor: colors.button,
  },
  actionText: {
    color: colors.button,
    fontSize: 13,
    fontWeight: '500',
  },
  likedText: {
    color: colors.white,
  },
  likeCount: {
    flex: 1,
    fontSize: 13,
    color: colors.grey,
    marginLeft: 12,
  },
  text: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.text,
  },
});
