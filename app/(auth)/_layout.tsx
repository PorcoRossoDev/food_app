import LoginSucces from '@/components/LoginSucces'
import { images } from '@/constants'
import { Slot } from 'expo-router'
import React, { useCallback, useEffect, useRef } from 'react'
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'
import 'react-native-reanimated'
import useAuthStore from '../../store/auth.store'

const AuthLayout = () => {
    const { isAuthenticated } = useAuthStore()
    // if( isAuthenticated ) return <Redirect href='/' />

    const bottomSheetRef = useRef(null);
    const openSheet = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);
    const closeSheet = useCallback(() => {
        bottomSheetRef.current?.dismiss();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            const timer = setTimeout(() => {
                openSheet();
            }, 600); // 600ms là khoảng thời gian an toàn

            return () => clearTimeout(timer);
        }
    }, [isAuthenticated]);

    return (
        <React.Fragment>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView className='bg-white h-full' keyboardShouldPersistTaps='handled'>
                    <View className='w-full relative' style={{ height: Dimensions.get('window').height / 2.25}}>
                        <ImageBackground source={images.loginGraphic} className='size-full rounded-b-lg' />
                        <Image source={images.logo} className='self-center size-48 absolute -bottom-16' />
                    </View>
                    <Slot />
                </ScrollView>
            </KeyboardAvoidingView>
            <LoginSucces
                ref={bottomSheetRef}
                onClose={closeSheet}
            />
        </React.Fragment>
    )
}

export default AuthLayout

const styles = StyleSheet.create({})