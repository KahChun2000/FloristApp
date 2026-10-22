import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { formatPrice } from '../data/products';
import { colors } from '../theme';

export default function ServiceCard({ product, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={require('../assets/images/product.jpg')}
        style={styles.image}
      />
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.title} numberOfLines={2}>
        {product.title}
      </Text>
      <Text style={styles.price}>{formatPrice(product.price)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 142,
    marginRight: 8,
    backgroundColor: colors.white,
    borderRadius: 6,
    overflow: 'hidden',
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  image: {
    width: 142,
    height: 138,
  },
  category: {
    fontSize: 12,
    color: colors.grey,
    marginTop: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginTop: 6,
    marginHorizontal: 10,
    minHeight: 38,
  },
  price: {
    fontSize: 15,
    color: colors.price,
    marginTop: 6,
    marginHorizontal: 10,
  },
});
