import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/products';
import { colors } from '../theme';
import ScreenHeader from '../components/ScreenHeader';
import QuantityStepper from '../components/QuantityStepper';

export default function CartScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { cart, changeQuantity, removeFromCart, clearCart } = useApp();
  const [orderPlaced, setOrderPlaced] = useState(false);

  let total = 0;
  cart.forEach(item => {
    total =
      total + (item.product.salePrice ?? item.product.price) * item.quantity;
  });

  function checkout() {
    clearCart();
    setOrderPlaced(true);
  }

  function goToMall() {
    navigation.navigate('Tabs', { screen: 'Mall' });
  }

  let emptyView = (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>Your cart is empty</Text>
      <Pressable onPress={goToMall}>
        <Text style={styles.link}>Go to Mall</Text>
      </Pressable>
    </View>
  );

  if (orderPlaced) {
    emptyView = (
      <View style={styles.empty}>
        <Text style={styles.successText}>Order placed! Thank you.</Text>
        <Pressable onPress={goToMall}>
          <Text style={styles.link}>Continue shopping</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader title="My Cart" onBack={() => navigation.goBack()} />
      <FlatList
        data={cart}
        keyExtractor={item => item.product.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={emptyView}
        renderItem={({ item }) => {
          const price = item.product.salePrice ?? item.product.price;
          return (
            <View style={styles.row}>
              <Image
                source={require('../assets/images/product.jpg')}
                style={styles.thumb}
              />
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.product.title}
                </Text>
                <Text style={styles.price}>
                  {formatPrice(price * item.quantity)}
                </Text>
                <View style={styles.actions}>
                  <QuantityStepper
                    value={item.quantity}
                    onDecrease={() =>
                      changeQuantity(item.product.id, item.quantity - 1)
                    }
                    onIncrease={() =>
                      changeQuantity(item.product.id, item.quantity + 1)
                    }
                  />
                  <Pressable onPress={() => removeFromCart(item.product.id)}>
                    <Text style={styles.remove}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        }}
      />
      {cart.length > 0 ? (
        <View
          testID="cart-footer"
          style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}
        >
          <Text style={styles.total}>{'Total: ' + formatPrice(total)}</Text>
          <Pressable style={styles.button} onPress={checkout}>
            <Text style={styles.buttonText}>Checkout</Text>
          </Pressable>
        </View>
      ) : null}
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
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  price: {
    fontSize: 15,
    color: colors.price,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  remove: {
    fontSize: 13,
    color: colors.grey,
    textDecorationLine: 'underline',
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontSize: 15,
    color: colors.grey,
  },
  successText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary,
  },
  link: {
    fontSize: 14,
    color: colors.link,
    textDecorationLine: 'underline',
    marginTop: 12,
  },
  footer: {
    backgroundColor: colors.white,
    padding: 16,
  },
  total: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  button: {
    backgroundColor: colors.button,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
