import { images } from '@/constants';
import useAuthStore from '@/store/auth.store';
import useCartStore from '@/store/cart.store';
import { TabBarIconProps } from '@/type';
import cn from 'clsx';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => {
    const cart = useCartStore(state => state.cart);
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <View className='tab-icon'>
            <View className='relative'>
                <Image source={icon} className='size-7' resizeMode='contain' tintColor={focused ? '#FE8C00' : '#5D5F6D'} />
                {
                    icon==images.bag && (
                        <Text className='absolute text-xs -top-3 -right-3 w-5 h-5 bg-primary text-white flex-center flex-row text-center items-center rounded-full leading-5'>{totalQty}</Text>
                    )
                }
            </View>
            <Text className={cn('text-sm font-bold', focused ? 'text-primary':'text-gray-200')}>{title}</Text>
        </View>
    )
}

const TabLayout = () => {

    const getTotalCart = useCartStore(state => state.getTotalCart);
    
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) return <Redirect href="/sign-in" />; // Nếu chưa đăng nhập thì chuyển hướng đến trang đăng ký
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    marginHorizontal: 20,
                    height: 80,
                    position: 'absolute',
                    bottom: 40,
                    backgroundColor: 'white',
                    shadowColor: '#1a1a1a',
                    shadowOffset: { width: 0, height: 2},
                    shadowOpacity: 0.1,
                    elevation: 5
                }
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: (({focused}) => <TabBarIcon title="Home" icon={images.home} focused={focused} />)
                }}
            />
            <Tabs.Screen 
                name='search'
                options={{
                    title: 'Search',
                    tabBarIcon: (({focused}) => <TabBarIcon title="Search" icon={images.search} focused={focused} />)
                }}
            />
            <Tabs.Screen 
                name='cart'
                options={{
                    // tabBarStyle: {display: 'none'},
                    title: 'Cart',
                    tabBarIcon: (({focused}) => <TabBarIcon title="Cart" icon={images.bag} focused={focused} />)
                }}
            />
            <Tabs.Screen 
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: (({focused}) => <TabBarIcon title="Profile" icon={images.person} focused={focused} />)
                }}
            />
            <Tabs.Screen
                name="menu/[id]"
                options={{
                    href: null, // vẫn ẩn nếu cần
                }}
            />
        </Tabs>
    )
}

export default TabLayout

const styles = StyleSheet.create({})