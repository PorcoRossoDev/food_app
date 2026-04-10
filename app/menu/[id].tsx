import { images } from '@/constants';
import useCutomizationStore from '@/store/customization.store';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MenuDetail = () => {

  const params = useLocalSearchParams();
  const {topping , side} = useCutomizationStore();

  console.log(topping, side)
  
  return (
    <SafeAreaView className='bg-[#FAFAFA] flex-1'>
      <View className='flex-between flex-row mt-5 items-center px-5'>
        <Pressable onPress={() => router.back()}>
          <Image source={images.arrowBack} className='size-5' resizeMode='contain' />
        </Pressable>
        <Pressable onPress={() => router.back()}>
          <Image source={images.search} className='size-6' resizeMode='contain' />
        </Pressable>
      </View>
      <View className='mt-8 flex-row justify-between pl-5'>
        <View className='w-[42%]'>
          <Text className='font-bold text-2xl'>Wendy's Burger</Text>
          <Text className='text-md mt-3 text-gray-400'>Cheeseburger</Text>
          <View className='mt-5 flex-row'>
            <View className='flex-row'>
              <Image source={images.star} className='size-5' />
              <Image source={images.star} className='size-5' />
              <Image source={images.star} className='size-5' />
              <Image source={images.star} className='size-5' />
              <Image source={images.star} className='size-5' />
            </View>
            <Text className='ml-4'>4.9/5</Text>
          </View>
          <View className='flex-row mt-5 items-center'>
            <Image source={images.dollar} className='size-6' />
            <Text className='text-2xl font-bold ml-1'>10.02</Text>
          </View>
          <View className='flex-row mt-6'>
            <View>
              <Text className='text-gray-500'>Calories</Text>
              <Text className='font-bold'>365 Cal</Text>
            </View>
            <View className='ml-5'>
              <Text className='text-gray-500'>Protein</Text>
              <Text className='font-bold'>35g</Text>
            </View>
          </View>
          <View className='mt-5'>
              <Text className='text-gray-500'>Bun Type</Text>
              <Text className='font-bold'>Whole Wheat</Text>
            </View>
        </View>
        <View className='w-[54%] flex-row flex-start items-start'>
          <Image source={images.burgerDetail} className='size-80' resizeMode='contain' />
        </View>
      </View>

      <View className='px-5'>
        <View className='flex-between flex-row item mt-5 bg-[#FE8C000D] px-5 py-5 rounded-[50px]'>
          <View className='flex-row items-center'>
            <Image source={images.dollar} className='size-8' resizeMode='contain' />
            <Text className='font-bold'>Free Delivery</Text>
          </View>
          <View className='flex-row items-center'>
            <Image source={images.clock} className='size-5' resizeMode='contain' />
            <Text className='ml-2 font-bold'>20 - 30 mins</Text>
          </View>
          <View className='flex-row items-center'>
            <Image source={images.star} className='size-6' resizeMode='contain' />
            <Text className='ml-2 font-bold'>4.5</Text>
          </View>
        </View>
        <Text className='mt-6 base-bold text-gray-500'>
          The Cheeseburger Wendy's Burger is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it's topped with melted American cheese, crispy lettuce, tomato, & crunchy pickles.
        </Text>

      </View>
      
    </SafeAreaView>
  )
}

export default MenuDetail;