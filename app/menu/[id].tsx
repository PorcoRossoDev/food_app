import { images } from '@/constants';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MenuDetail = () => {

  const params = useLocalSearchParams();
  console.log(params)
  
  return (
    <SafeAreaView>
      <View className='bg-[#FAFAFA] pb-9'>
        <View className='flex-between flex-row mt-5 items-center'>
          <Pressable onPress={() => router.back()}>
            <Image source={images.arrowBack} className='size-7' resizeMode='contain' />
          </Pressable>
          <Pressable onPress={() => router.back()}>
            <Image source={images.search} className='size-7' resizeMode='contain' />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MenuDetail;