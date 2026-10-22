import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabBar from './TabBar';
import HomeScreen from '../screens/HomeScreen';
import MallScreen from '../screens/MallScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import InboxScreen from '../screens/InboxScreen';
import AccountScreen from '../screens/AccountScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import AppointmentDetailScreen from '../screens/AppointmentDetailScreen';
import MessageDetailScreen from '../screens/MessageDetailScreen';
import CartScreen from '../screens/CartScreen';
import LikedPostsScreen from '../screens/LikedPostsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function renderTabBar(props) {
  return <TabBar {...props} />;
}

function Tabs() {
  return (
    <Tab.Navigator tabBar={renderTabBar} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mall" component={MallScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetailScreen}
      />
      <Stack.Screen name="MessageDetail" component={MessageDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="LikedPosts" component={LikedPostsScreen} />
    </Stack.Navigator>
  );
}
