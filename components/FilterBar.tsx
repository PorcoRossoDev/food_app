import { Category } from '@/type'
import cn from 'clsx'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'

const FilterBar = ({ categories }: {categories: Category[]}) => {
  
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category || 'all')
  const handlePress = (id: string) => {
    setActive(id)
    if( id == 'all' ) router.setParams({category: undefined})
    else router.setParams({category: id})
  }
  const filterData = [
    {id: 'all', name: 'All'},
    ...(categories ?? [])
  ]  

  return (
    <FlatList
      data={filterData}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName='gap-x-2 pb-3'
      renderItem={({item}) => (
        <TouchableOpacity 
          key={item.id}
          style={Platform.OS === 'android' ? {elevation: 5, shadowColor: '#878787'} : {}}
          className={cn('filter', active == item.id ? 'bg-amber-500': 'bg-white')}
          onPress={() => handlePress(item.id)}
        >
          <Text className={cn('body-medium', active == item.id ? 'text-white': 'text-gray-200')}>{item.name}</Text>
        </TouchableOpacity>
      )}
      />
  )
}

export default FilterBar

const styles = StyleSheet.create({})