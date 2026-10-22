import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useApp } from '../context/AppContext';
import { formatPrice, getProduct } from '../data/products';
import { defaultAppointment, timeSlots } from '../data/appointment';
import { colors } from '../theme';
import ScreenHeader from '../components/ScreenHeader';
import QuantityStepper from '../components/QuantityStepper';

export default function ProductDetailScreen({ navigation, route }) {
  const { cartCount, addToCart, setAppointment } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booked, setBooked] = useState(null);

  const product = getProduct(route.params.productId);
  if (!product) {
    return null;
  }

  const onSale = product.salePrice !== undefined;
  const finalPrice = product.salePrice ?? product.price;
  const isService = product.type === 'service';

  function onAddToCart() {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
    }
  }

  function onBook() {
    if (product && selectedSlot) {
      setAppointment({
        service: product.title,
        date: selectedSlot.date,
        time: selectedSlot.time,
        address: defaultAppointment.address,
      });
      setBooked(selectedSlot);
    }
  }

  const cartButton = (
    <Pressable onPress={() => navigation.navigate('Cart')}>
      <Text style={styles.cartText}>{'Cart (' + cartCount + ')'}</Text>
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title={isService ? 'Service' : 'Product'}
        onBack={() => navigation.goBack()}
        right={cartButton}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Image
            source={require('../assets/images/product.jpg')}
            style={styles.image}
          />
          {onSale ? (
            <Image
              source={require('../assets/images/sale-badge.png')}
              style={styles.badge}
            />
          ) : null}
        </View>

        <View style={styles.body}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.title}>{product.title}</Text>
          {onSale ? (
            <Text style={styles.oldPrice}>{formatPrice(product.price)}</Text>
          ) : null}
          <Text style={styles.price}>{formatPrice(finalPrice)}</Text>

          <Text style={styles.sectionLabel}>DESCRIPTION</Text>
          <Text style={styles.description}>{product.description}</Text>

          {isService ? (
            <View>
              <Text style={styles.sectionLabel}>CHOOSE A TIME</Text>
              {timeSlots.map(slot => {
                const selected = selectedSlot === slot;
                return (
                  <Pressable
                    key={slot.date + slot.time}
                    style={[styles.slot, selected && styles.slotSelected]}
                    onPress={() => setSelectedSlot(slot)}
                  >
                    <Text
                      style={[
                        styles.slotText,
                        selected && styles.slotTextSelected,
                      ]}
                    >
                      {slot.date + ' · ' + slot.time}
                    </Text>
                  </Pressable>
                );
              })}
              <Pressable
                style={[styles.button, !selectedSlot && styles.buttonDisabled]}
                onPress={onBook}
              >
                <Text style={styles.buttonText}>Book Now</Text>
              </Pressable>
              {booked ? (
                <View style={styles.message}>
                  <Text style={styles.messageText}>
                    {'Booked for ' + booked.date + ' at ' + booked.time}
                  </Text>
                  <Pressable
                    onPress={() => navigation.navigate('AppointmentDetail')}
                  >
                    <Text style={styles.link}>View appointment</Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          ) : (
            <View>
              <Text style={styles.sectionLabel}>QUANTITY</Text>
              <QuantityStepper
                value={quantity}
                onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
                onIncrease={() => setQuantity(quantity + 1)}
              />
              <Pressable style={styles.button} onPress={onAddToCart}>
                <Text style={styles.buttonText}>Add to Cart</Text>
              </Pressable>
              {added ? (
                <View style={styles.message}>
                  <Text style={styles.messageText}>Added to cart</Text>
                </View>
              ) : null}
            </View>
          )}
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
  cartText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  badge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 64,
    height: 64,
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
  },
  oldPrice: {
    fontSize: 13,
    color: colors.grey,
    textDecorationLine: 'line-through',
    marginTop: 10,
  },
  price: {
    fontSize: 20,
    color: colors.price,
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.grey,
    letterSpacing: 1,
    marginTop: 24,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },
  slot: {
    borderWidth: 1,
    borderColor: colors.inactive,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  slotSelected: {
    borderColor: colors.primary,
    backgroundColor: '#E9F1ED',
  },
  slotText: {
    fontSize: 14,
    color: colors.text,
  },
  slotTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  button: {
    backgroundColor: colors.button,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  message: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E9F1ED',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  messageText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  link: {
    color: colors.link,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
