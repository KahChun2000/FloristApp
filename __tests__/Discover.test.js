import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import DiscoverScreen from '../src/screens/DiscoverScreen';
import PostDetailScreen from '../src/screens/PostDetailScreen';
import LikedPostsScreen from '../src/screens/LikedPostsScreen';
import { createNavigation, renderWithApp } from '../testing/renderWithApp';

async function renderScreen(Screen, params) {
  const navigation = createNavigation();
  const route = { key: 'test', name: 'test', params };
  await renderWithApp(<Screen navigation={navigation} route={route} />);
  return navigation;
}

test('discover shows all posts and filters by category chip', async () => {
  await renderScreen(DiscoverScreen);
  expect(screen.getByText('How to keep your Pilea happy indoors')).toBeTruthy();
  await fireEvent.press(screen.getAllByText('Flowers')[0]);
  expect(screen.queryByText('How to keep your Pilea happy indoors')).toBeNull();
  expect(
    screen.getByText('Making a bouquet last longer in a vase at home'),
  ).toBeTruthy();
  await fireEvent.press(screen.getByText('All'));
  expect(screen.getByText('How to keep your Pilea happy indoors')).toBeTruthy();
});

test('discover opens a post', async () => {
  const navigation = await renderScreen(DiscoverScreen);
  await fireEvent.press(
    screen.getByText('How to keep your Pilea happy indoors'),
  );
  expect(navigation.navigate).toHaveBeenCalledWith('PostDetail', {
    postId: 'd1',
  });
});

test('liking a post changes the label and count', async () => {
  await renderScreen(PostDetailScreen, { postId: 'd1' });
  expect(screen.getByText('♡ Like')).toBeTruthy();
  expect(screen.getByText('24 likes')).toBeTruthy();
  await fireEvent.press(screen.getByText('♡ Like'));
  expect(screen.getByText('♥ Liked')).toBeTruthy();
  expect(screen.getByText('25 likes')).toBeTruthy();
});

test('liked posts shows an empty message', async () => {
  await renderScreen(LikedPostsScreen);
  expect(screen.getByText('No liked posts yet')).toBeTruthy();
});

test('liked posts lists liked posts and opens them', async () => {
  const navigation = await renderScreen(LikedPostsScreen);
  await fireEvent.press(screen.getByText('test-like-post'));
  await fireEvent.press(
    screen.getByText('How to keep your Pilea happy indoors'),
  );
  expect(navigation.navigate).toHaveBeenCalledWith('PostDetail', {
    postId: 'd1',
  });
});
