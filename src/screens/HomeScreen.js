import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useApp } from '../context/AppContext';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { posts } from '../data/posts';
import { colors } from '../theme';
import HomeHeader from '../components/HomeHeader';
import ServiceCard from '../components/ServiceCard';
import ShopPlantsStrip from '../components/ShopPlantsStrip';
import TwoColumnPosts from '../components/TwoColumnPosts';
import LocationSection from '../components/LocationSection';

const services = products.filter(item => item.type === 'service');

export default function HomeScreen({ navigation }) {
  const { appointment } = useApp();

  function openMall(type, categoryId) {
    navigation.navigate('Mall', { type, categoryId });
  }

  return (
    <ScrollView style={styles.screen}>
      <HomeHeader
        appointment={appointment}
        onOpenAppointment={() => navigation.navigate('AppointmentDetail')}
        onBookService={() => openMall('service')}
        onOpenAccount={() => navigation.navigate('Account')}
      />

      <Pressable onPress={() => openMall()} accessibilityLabel="Banner">
        <Image
          source={require('../assets/images/banner.jpg')}
          style={styles.banner}
        />
      </Pressable>

      <View style={styles.buttons}>
        <Pressable onPress={() => openMall('shop')} accessibilityLabel="Shop">
          <Image
            source={require('../assets/images/btn-shop.png')}
            style={styles.button}
          />
        </Pressable>
        <Pressable
          onPress={() => openMall('service')}
          accessibilityLabel="Services"
        >
          <Image
            source={require('../assets/images/btn-services.png')}
            style={styles.button}
          />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Discover')}
          accessibilityLabel="Posts"
        >
          <Image
            source={require('../assets/images/btn-posts.png')}
            style={styles.button}
          />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {categories.map(category => (
          <Pressable
            key={category.id}
            accessibilityLabel={category.name}
            onPress={() => openMall(undefined, category.id)}
          >
            <Image source={category.circleImage} style={styles.circle} />
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.servicesSection}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>NEW SERVICES</Text>
            <Text style={styles.sectionSubtitle}>
              Recommended based on your preference
            </Text>
          </View>
          <Pressable onPress={() => openMall('service')}>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>
        <FlatList
          data={services}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.servicesList}
          renderItem={({ item }) => (
            <ServiceCard
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetail', { productId: item.id })
              }
            />
          )}
        />
      </View>

      <ShopPlantsStrip
        onOpenShop={() => openMall('shop')}
        onOpenCategory={categoryId => openMall('shop', categoryId)}
      />

      <View style={styles.trending}>
        <Image
          source={require('../assets/images/trending-header.jpg')}
          style={styles.trendingHeader}
        />
        <View style={styles.trendingList}>
          <TwoColumnPosts
            posts={posts}
            onOpenPost={postId => navigation.navigate('PostDetail', { postId })}
          />
        </View>
      </View>

      <LocationSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  banner: {
    width: '100%',
    height: undefined,
    aspectRatio: 828 / 500,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 8,
  },
  button: {
    width: 125,
    height: 65,
  },
  categories: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  circle: {
    width: 78,
    height: 78,
    marginRight: 6,
  },
  servicesSection: {
    backgroundColor: colors.background,
    marginTop: 14,
    paddingTop: 22,
    paddingBottom: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.grey,
    marginTop: 2,
  },
  viewAll: {
    fontSize: 12,
    color: colors.grey,
  },
  servicesList: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  trending: {
    backgroundColor: colors.deep,
    paddingBottom: 20,
  },
  trendingHeader: {
    width: '100%',
    height: undefined,
    aspectRatio: 828 / 296,
  },
  trendingList: {
    marginTop: -4,
  },
});
