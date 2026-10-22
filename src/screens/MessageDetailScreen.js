import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { getMessage } from '../data/messages';
import { colors } from '../theme';
import ScreenHeader from '../components/ScreenHeader';

export default function MessageDetailScreen({ navigation, route }) {
  const message = getMessage(route.params.messageId);
  if (!message) {
    return null;
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Message" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.date}>{message.date}</Text>
        <Text style={styles.title}>{message.title}</Text>
        <Text style={styles.body}>{message.body}</Text>
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
    padding: 20,
  },
  date: {
    fontSize: 12,
    color: colors.grey,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 6,
  },
  body: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.text,
    marginTop: 16,
  },
});
