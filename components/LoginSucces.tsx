import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { forwardRef, useCallback, useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';


const LoginSucces = forwardRef((props: any, ref: any) => {
    const { onClose } = props;

    const snapPoints = useMemo(() => ['50%'], []);

    const finalSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    const renderBackdrop = useCallback(
        (backdropProps: any) => (
            <BottomSheetBackdrop
                {...backdropProps}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior="none"
            />
        ),
        []
    );

    const goToHome = () => {
        router.push('/')

        ref.current?.dismiss();
        
        // 2. Thực hiện logic khác (ví dụ: gọi hàm onClose từ props)
        if (props.onClose) {
            props.onClose();
        }
    }

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            enableDynamicSizing={false}
            snapPoints={finalSnapPoints}
            backdropComponent={renderBackdrop}
            backgroundStyle={styles.sheetBackground}
            handleIndicatorStyle={styles.indicator}
            onDismiss={onClose}
            detached={false}
            enablePanDownToClose={false}
        >
            <BottomSheetView className='px-6'>
                {/* Loại bỏ các lớp View trung gian không cần thiết để tránh lỗi string */}
                <View className='flex-center mb-4'>
                    <Image source={images.success} className='size-48 inline-flex' resizeMode='contain' />
                    <Text className='h1-bold font-bold text-center'>Login Successfull</Text>
                    <Text className='text-center mt-3 text-xl font-normal'>You're all set to continue where you left off.</Text>
                </View>

                <CustomButton 
                    title='Go to Homepage'
                    onPress={goToHome}
                    className='text-3xl'
                />
                
            </BottomSheetView>
        </BottomSheetModal>
    );
});

export default LoginSucces;

const styles = StyleSheet.create({
    sheetBackground: {
        backgroundColor: '#fff',
        borderRadius: 24, 
    }
});