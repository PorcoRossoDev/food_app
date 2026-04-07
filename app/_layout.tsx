import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useAuthStore from "../store/auth.store";
import './global.css';

export default function RootLayout() {

  const { isLoading, fetchAuthentication } = useAuthStore()

  const [ fontsLoaded, error ] = useFonts({
    'QuickSand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'QuickSand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
    'QuickSand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    'QuickSand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    'QuickSand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
  })

  useEffect(() => {
    if(error) throw error; // Nếu lỗi thì ném lỗi ra để có thể debug
    if( fontsLoaded ) SplashScreen.hideAsync(); // Nếu tải xong thì ẩn màn hình chờ
  }, [fontsLoaded, error])

  useEffect(() => {
    fetchAuthentication
  }, [])

  if( !fontsLoaded || isLoading ) return null

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}