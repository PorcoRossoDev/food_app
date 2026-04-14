import { images } from '@/constants';
import useCartStore from '@/store/cart.store';
import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const CartButton = () => {
    const quantity = useCartStore(state =>
        state.cart.reduce((sum, item) => sum + item.qty, 0)
    );
    return (
        <TouchableOpacity className="cart-btn" onPress={() => router.push('/cart')}>
            <Image source={images.bag} className="size-6" resizeMode="contain" />
            {
                quantity > 0 && (
                    <View className="cart-badge">
                        <Text className="small-bold text-white">
                            {quantity}
                        </Text>
                    </View>
                )
            }
        </TouchableOpacity>
    )
}

export default CartButton