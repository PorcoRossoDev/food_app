import { images } from '@/constants';
import useCartStore from '@/store/cart.store';
import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Image, KeyboardAvoidingView, Platform, Pressable, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Cart = () => {

  const { cart, deleteItemCart, updateQty, updateBtnQty } = useCartStore();
  const insets = useSafeAreaInsets();
  const [checked, setChecked] = useState(true);
  const getTotalCart = useCartStore(state => state.getTotalCart);
  const [refreshing, setRefreshing] = useState(false);

  const total = useCartStore(state =>
    state.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  const quantity = useCartStore(state =>
    state.cart.reduce((sum, item) => sum + item.qty, 0)
  );

  
  const handleDeleteItemCart = (id: string) => {
    deleteItemCart({id})
    Alert.alert('Remove item cart success!');
  }

  const handleUpdateQty = (id: string, val: string) => {
    updateQty({id, val})
  }

  const handleBtnQty = (id: string, type: string) => {
    updateBtnQty({id, type})
  }

  const onRefresh = async () => {
    setRefreshing(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="bg-[#FAFAFA] flex-1 relative">
        <ScrollView 
          className="flex-1 relative px-5" 
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {
            cart && cart.length
            ? (
              <View className='pb-28'>
                <View className="flex-between flex-row mt-5 items-center">
                  <Pressable onPress={() => router.back()}>
                    <Image
                      source={images.arrowBack}
                      className="size-5"
                      resizeMode="contain"
                    />
                  </Pressable>
                  <Pressable onPress={() => router.back()}>
                    <Image
                      source={images.search}
                      className="size-6"
                      resizeMode="contain"
                    />
                  </Pressable>
                </View>
                <View className='flex-between flex-row mt-5'>
                  <View>
                    <Text className='text-primary uppercase'>Delevery Location</Text>
                    <Text className='base-semibold font-bold'>Home</Text>
                  </View>
                  <View>
                    <TouchableOpacity className='border border-primary rounded-3xl px-4 py-3'>
                      <Text className='text-primary'>Change Location</Text>
                    </TouchableOpacity>
                  </View>
                </View>


                <FlatList
                  data={cart}
                  scrollEnabled={false}
                  keyExtractor={item=> item.id}
                  contentContainerClassName=''
                  renderItem={({item}) => {
                    return (
                        <View className='flex-between flex-row bg-white rounded-2xl px-4 py-3 mt-6'>
                          <View className='w-[42%] flex-row items-center justify-between'>
                            <Checkbox
                              value={checked}
                              onValueChange={setChecked}
                              color={checked ? '#FE8C00' : undefined}
                            />
                            <View className='bg-white-100'>
                              <Image 
                                source={{uri: item.image}}
                                className='size-28'
                                resizeMode='contain'
                              />
                            </View>
                          </View>
                          <View className='flex-1 flex-row flex-between pl-4 h-full'>
                            <View>
                              <Text className='base-semibold font-bold'>{item.title}</Text>
                              <Text className='text-primary base-semibold font-bold'>${item.price}</Text>
                              <View className="flex-row items-center">
                                <Pressable
                                  onPress={() => handleBtnQty(item.id, 'minus')}
                                  className="bg-amber-100 size-8 flex-center item-center rounded-lg"
                                >
                                  <Image
                                    source={images.minus}
                                    className="size-4"
                                    resizeMode="contain"
                                  />
                                </Pressable>
                                <TextInput
                                  value={String(item.qty)}
                                  className="paragraph-bold w-14 text-center text-xl font-bold"
                                  keyboardType="numeric"
                                  onChangeText={(val) => handleUpdateQty(item.id, val)}
                                />
                                <Pressable
                                  onPress={() => handleBtnQty(item.id, 'plus')}
                                  className="bg-amber-100 size-8 flex-center item-center rounded-lg"
                                >
                                  <Image
                                    source={images.plus}
                                    className="size-4"
                                    resizeMode="contain"
                                  />
                                </Pressable>
                              </View>
                            </View>
                            <View className=''>
                              <TouchableOpacity onPress={() => handleDeleteItemCart(item.id)}>
                                <Image 
                                  className='size-7'
                                  source={images.trash}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                    )
                  }}
                />

                <View className='mt-5 border border-[#EDEDED] px-6 py-5 rounded-2xl'>
                  <Text className='base-bold !text-2xl font-bold'>Payment Summary</Text>
                  <View className='flex-row flex-between mt-2'>
                    <Text className='text-gray-500 text-lg'>Total Items ({quantity})</Text>
                    <Text className='base-bold font-bold'>${total}</Text>
                  </View>
                  <View className='flex-row flex-between mt-2'>
                    <Text className='text-gray-500 text-lg'>Delivery Free</Text>
                    <Text className='base-bold font-bold'>Free</Text>
                  </View>
                  {/* <View className='flex-row flex-between mt-2 hide'>
                    <Text className='text-gray-500 text-lg'>Discount</Text>
                    <Text className='base-bold font-bold !text-green-600'>-$900</Text>
                  </View> */}
                  
                  <View className='flex-row flex-between mt-3 border-t border-[#EDEDED] pt-5'>
                    <Text className='text-gray-500 text-lg'>Total</Text>
                    <Text className='base-bold font-bold'>${total}</Text>
                  </View>
                </View>
                  
                <View className="w-full mt-8">
                  <View
                    className=""
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 20,

                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 6,

                      elevation: 3,
                    }}
                  >
                    <TouchableOpacity
                      className="bg-white-200 rounded-3xl px-4 py-4"
                    >
                      <Text className="text-white text-xl font-medium text-center">
                        Order Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
            : (
              <View className='flex-1 items-center justify-center'>
                <View className='flex-center mt-5'>
                  <Image 
                    source={images.emptyState} 
                    className='size-48' 
                    resizeMode='contain'
                  />
                  <Text className='font-bold text-xl'>Empty cart</Text>
                  <Text className='mt-2 text-gray-500'>Pelase add product to cart and return here.</Text>
                </View>
              </View>
            )
          }
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default Cart

const styles = StyleSheet.create({})