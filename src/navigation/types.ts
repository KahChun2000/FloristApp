import { NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';

export type MallParams = {
  type?: 'shop' | 'service';
  categoryId?: string;
};

export type TabParamList = {
  Home: undefined;
  Mall: MallParams | undefined;
  Discover: undefined;
  Inbox: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  ProductDetail: { productId: string };
  PostDetail: { postId: string };
  AppointmentDetail: undefined;
  MessageDetail: { messageId: string };
  Cart: undefined;
  LikedPosts: undefined;
};

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

export type StackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
