import { images } from '@/constants'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const SearchBar = () => {

  const params = useLocalSearchParams<{keyword: string}>();
  const [keyword, setKeyword] = useState(params.keyword);

  const handleSearch = (text: string) => {
    setKeyword(text)
    if( !text ) router.setParams({keyword: ''})
  }

  return (
    <View className='searchbar' style={Platform.OS === 'android' ? {elevation: 3, shadowColor: '#878787'} : {}}>
      <TextInput 
        className='flex-1 p-5' 
        placeholder='Seach for pizzas, burgers,...'
        value={keyword}
        onChangeText={handleSearch}
        placeholderTextColor='#A0A0A0'
        returnKeyType='search'
      />
      <TouchableOpacity 
        className='pr-5' 
        onPress={() => router.setParams({keyword})}
      >
        <Image 
          source={images.search}
          className='size-6'
          resizeMode='contain'
          tintColor='#5D5F6D'
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})