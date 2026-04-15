import EditUser from '@/components/EditUser'
import { images } from '@/constants'
import useAuthStore from '@/store/auth.store'
import { router } from 'expo-router'
import React, { useCallback, useRef } from 'react'
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {

  const { fetchLogout, user } = useAuthStore();
  const bottomSheetRef = useRef(null);
  const openSheet = useCallback(() => {
      bottomSheetRef.current?.present();
  }, []);
  const closeSheet = useCallback(() => {
      bottomSheetRef.current?.dismiss();
  }, []);

  const handleUpdate = () => {
    openSheet();
  }

  const data = [
    {
      icon: images.user,
      name: 'Full Name',
      value: user?.name
    },
    {
      icon: images.envelope,
      name: 'Email',
      value: user?.email
    },
    {
      icon: images.phone,
      name: 'Phone number',
      value: user?.phone
    },
    {
      icon: images.location,
      name: 'Address - (Home)',
      value: user?.address
    },
  ];

  const handleLogout = () => {
    fetchLogout()
    router.push('/(auth)/sign-in')
  }

  return (
    <SafeAreaView className=' bg-[#FAFAFA] flex-1'>
      <FlatList 
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <View className='flex-row items-center px-5 gap-x-5 gap-y-8'>
              <View className='size-12 bg-[#fe8c001e] flex-center rounded-full'>
                <Image source={item.icon} className='size-7' resizeMode='contain' />
              </View>
              <View>
                <Text className='text-gray-400'>{item.name}</Text>
                <Text className='font-bold text-md mt-1'>{item.value}</Text>
              </View>
            </View>
          )
        }} 
        numColumns={1}
        contentContainerClassName='gap-y-8 bg-white rounded-2xl px-5'
        ListHeaderComponent={() => {
          return (
            <View className='bg-[#FAFAFA] pb-9'>
              <View className='flex-between flex-row mt-5 items-center'>
                <Pressable onPress={() => router.back()}>
                  <Image source={images.arrowBack} className='size-7' resizeMode='contain' />
                </Pressable>
                <Text className='font-bold text-xl'>Profile</Text>
                <Pressable onPress={() => router.back()}>
                  <Image source={images.search} className='size-7' resizeMode='contain' />
                </Pressable>
              </View>
              <View className='justify-center flex-row '>
                <View className='mt-10 size-28 relative'>
                  <Image source={images.avatar} className='size-28' resizeMode='contain' />
                  <View className='size-7 bg-primary flex-center rounded-full absolute bottom-3 right-0'>
                    <Image source={images.pencil} className='size-4' resizeMode='contain' />
                  </View>
                </View>
              </View>
            </View>
          )
        }}
        ListFooterComponent={() => {
          return (
            <View className='bg-[#FAFAFA] pt-9 mb-10 pb-24'>
              <TouchableOpacity onPress={handleUpdate} className='border-[#FE8C00] bg-[#fe8c001e] text-center border-[1px] px-4 py-4 rounded-3xl' >
                <Text className='text-center color-primary'>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} className='border-[#F14141] mt-5 bg-[#f141411c] text-center border-[1px] px-4 py-4 rounded-3xl'>
                <Text className='text-center color-[#F14141]'>Logout</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <EditUser
          ref={bottomSheetRef}
          onClose={closeSheet}
      />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})