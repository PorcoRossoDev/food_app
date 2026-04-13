import useCartStore from '@/store/cart.store';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Cart = () => {

  const {cart} = useCartStore();

  useEffect(() => {
    console.log(cart)
  }, [])
  

  return (
    <View> 
      <Text>Cart</Text>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})