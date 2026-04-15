import CustomButton from '@/components/CustomButton';
import useAuthStore from '@/store/auth.store';
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetView
} from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import CustomInputForm from './CustomInputForm';

const EditUser = forwardRef((props: any, ref: any) => {
    const { onClose } = props;
    const snapPoints = useMemo(() => ['45%'], []);
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

    const { user, fetchUpdateUser } = useAuthStore()

    const goToHome = () => {
        router.push('/')

        ref.current?.dismiss();
        
        // 2. Thực hiện logic khác (ví dụ: gọi hàm onClose từ props)
        if (props.onClose) {
            props.onClose();
        }
    }

    const [form, setForm] = useState({
        name: user?.name,
        phone: user?.phone,
        address: user?.address
    })

    const handleSubmit = () => {
        fetchUpdateUser(form, user?.id)
        props.onClose();
    }

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            enableDynamicSizing={false} // Hiển thị full % màn hình bottom modal được cài đặt.
            snapPoints={finalSnapPoints}
            backdropComponent={renderBackdrop}
            backgroundStyle={styles.sheetBackground}
            handleIndicatorStyle={styles.indicator}
            onDismiss={onClose}
            detached={false}
            enablePanDownToClose={true}
            // keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            keyboardBehavior="extend"
            // keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustResize"

        >
            
            <BottomSheetView className='px-6'>
                {/* Loại bỏ các lớp View trung gian không cần thiết để tránh lỗi string */}

                <CustomInputForm 
                    placeholder=''
                    value={form.name}
                    onChangeText={(text) => setForm({...form, name: text})}
                    label='Fullname'
                    keyboardType='default'
                    classData="border border-gray-400 rounded-2xl mt-2 mb-4"
                />

                <CustomInputForm 
                    placeholder=''
                    value={form.phone}
                    onChangeText={(text) => setForm({...form, phone: text})}
                    label='Phone'
                    keyboardType='numeric'
                    classData="border border-gray-400 rounded-2xl mt-2 mb-4"
                />
                
                <CustomInputForm 
                    placeholder=''
                    value={form.address}
                    onChangeText={(text) => setForm({...form, address: text})}
                    label='Address'
                    keyboardType='default'
                    classData="border border-gray-400 rounded-2xl mt-2 mb-6"
                />

                <CustomButton 
                    title='Submt'
                    onPress={handleSubmit}
                    className='text-3xl base-bold font-bold'
                />
                
            </BottomSheetView>
            
        </BottomSheetModal>
    );
});

export default EditUser;

const styles = StyleSheet.create({
    sheetBackground: {
        backgroundColor: '#fff',
        borderRadius: 24, 
    }
});