import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { TabScreenProps } from '../navigation/types';
import { useApp } from '../context/AppContext';
import { messages } from '../data/messages';
import { colors } from '../theme';
import ScreenHeader from '../components/ScreenHeader';

export default function InboxScreen({ navigation }: TabScreenProps<'Inbox'>) {
  const { readMessageIds, unreadCount, markRead, markAllRead } = useApp();

  function openMessage(messageId: string) {
    markRead(messageId);
    navigation.navigate('MessageDetail', { messageId });
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Inbox" />
      <View style={styles.toolbar}>
        <Text style={styles.count}>{unreadCount + ' unread'}</Text>
        <Pressable onPress={markAllRead}>
          <Text style={styles.markAll}>Mark all as read</Text>
        </Pressable>
      </View>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const unread = !readMessageIds.includes(item.id);
          return (
            <Pressable style={styles.row} onPress={() => openMessage(item.id)}>
              <View style={[styles.dot, unread && styles.dotUnread]} />
              <View style={styles.info}>
                <View style={styles.titleRow}>
                  <Text
                    style={[styles.title, unread && styles.titleUnread]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                <Text style={styles.preview} numberOfLines={1}>
                  {item.preview}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.background,
  },
  count: {
    fontSize: 13,
    color: colors.grey,
  },
  markAll: {
    fontSize: 13,
    color: colors.link,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 14,
  },
  dotUnread: {
    backgroundColor: colors.price,
  },
  info: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  titleUnread: {
    fontWeight: '700',
  },
  date: {
    fontSize: 12,
    color: colors.grey,
    marginLeft: 10,
  },
  preview: {
    fontSize: 13,
    color: colors.grey,
    marginTop: 4,
  },
});
