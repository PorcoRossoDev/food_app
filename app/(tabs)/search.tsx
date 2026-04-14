import CartButton from '@/components/CartButton'
import FilterBar from '@/components/FilterBar'
import MenuCard from '@/components/MenuCard'
import SearchBar from '@/components/SearchBar'
import { images } from '@/constants'
import useCategoryStore from '@/store/category.store'
import useMenuStore from '@/store/menu.store'
import { MenuItem } from '@/type'
import cn from 'clsx'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {

  const { category, keyword } = useLocalSearchParams<{category: string, keyword: string}>()

  const { menuList, fetchMenus } = useMenuStore()
  const { categories, fetchCategores } = useCategoryStore()

  useEffect(() => {
    fetchMenus(category, keyword);
  }, [category, keyword])

  // useEffect(() => {
  //   if (!category && !keyword) return;

  //   fetchMenus(category, keyword);
  // }, [category, keyword]);
  
  useEffect(() => {
    fetchCategores();
  }, [])

  useEffect(() => {
  }, [menuList, categories]);
  
  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList
        data={menuList}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index %2 == 0
          return (
            <View className={cn('flex-1 max-w-[48%]', !isFirstRightColItem ? 'mt-8': 'mt-0')}>
              <MenuCard item={item as MenuItem} />
            </View>
          )
        }}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperClassName='gap-7'
        contentContainerClassName='gap-7 px-5 pb-32'
        ListHeaderComponent={() => (
          <View className='my-5 gap-5'>
            <View className='flex-between flex-row w-full'>
              <View className='flex-start'>
                <Text className='small-bold font-bold uppercase text-primary'>Search</Text>
                <View className='flex-start flex-row gap-x-1 mt-0.5'>
                  <Text className='paragraph-semibold font-bold text-dark-100'>Find your favorite food</Text>
                </View>
              </View>

              <CartButton />
            </View>
            <SearchBar />
            <FilterBar categories={categories} />
          </View>
        )}
        ListEmptyComponent={() => {
          return (
            <View className='flex-center'>
              <Image 
                source={images.emptyState} 
                className='size-48' 
                resizeMode='contain'
              />
              <Text className='font-bold text-xl'>Nothing matched your search</Text>
              <Text className='mt-2 text-gray-500'>Try a different search term or check for types</Text>
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})