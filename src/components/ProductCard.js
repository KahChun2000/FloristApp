import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { formatPrice } from '../data/products';
import { colors } from '../theme';

export default function ProductCard({ product, onPress }) {
  const onSale = product.salePrice !== undefined;
  const finalPrice = product.salePrice ?? product.price;

  return (
    <Pressable style={styles.cell} onPress={onPress}>
      <View style={styles.card}>
        <View>
          <Image
            source={require('../assets/images/product.jpg')}
            style={styles.image}
            resizeMode='cover'
          />
          {onSale ? (
            <Image
              source={require('../assets/images/sale-badge.png')}
              style={styles.badge}
            />
          ) : null}
        </View>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        {onSale ? (
          <Text style={styles.oldPrice}>{formatPrice(product.price)}</Text>
        ) : null}
        <Text style={styles.price}>{formatPrice(finalPrice)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: '50%',
    paddingHorizontal: 4,
    paddingBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 18,
  },
  image: {
    width: '100%',
    borderRadius: 4,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 48,
    height: 48,
  },
  category: {
    fontSize: 12,
    color: colors.grey,
    marginTop: 14,
    marginHorizontal: 7,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginTop: 6,
    marginHorizontal: 7,
  },
  oldPrice: {
    fontSize: 12,
    color: colors.grey,
    textDecorationLine: 'line-through',
    marginTop: 6,
    marginHorizontal: 7,
  },
  price: {
    fontSize: 15,
    color: colors.price,
    marginTop: 4,
    marginHorizontal: 7,
  },
});
