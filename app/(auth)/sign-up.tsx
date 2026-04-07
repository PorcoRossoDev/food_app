import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

const SignUp = () => {
    const [isSumitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const submit = async () => {
        if (!form.name || !form.email || !form.password) return Alert.alert('Please fill in all fields');

        setIsSubmitting(true);

        try {
            Alert.alert('Success', 'User signed up successfully');
            router.push('/');
        } catch (error) {
            Alert.alert('Error', 'An error occurred while signing up');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
            <CustomInput
                placeholder='Enter your name'
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
                label='Name'
                keyboardType='default'
            />
            <CustomInput
                placeholder='Enter your email'
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                label='Email'
                keyboardType='email-address'
            />
            <CustomInput
                placeholder='Enter your password'
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
                label='Password'
                secureTextEntry
                keyboardType='default'
            />
            <CustomButton
                title='Sign In'
                isLoading={isSumitting}
                onPress={submit}
            />
            <View className='flex justify-center mt-5 flex-row gap-2'>
                <Text className='base-regular text-gray-100'>Already have an account? </Text>
                <Link asChild href='/sign-in' className='base-bold text-primary'>
                    <Text>Sign In</Text>
                </Link>
            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({})