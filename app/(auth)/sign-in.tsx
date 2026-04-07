import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import useAuthStore from '../../store/auth.store'

const SignIn = () => {
  const [isSumitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { fetchAuthentication } = useAuthStore()

  const submit = async () => {
    if( !form.email || !form.password ) return Alert.alert('Please fill in all fields');

    setIsSubmitting(true);

    try {
      const user = await useAuthStore.getState().fetchAuthentication({
        email: form.email,
        password: form.password
      });
      // router.push('/');
    } catch (error) {
      Alert.alert('Error', 'An error occurred while signing in');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
        <CustomInput 
              placeholder='Enter your email'
              value={form.email}
              onChangeText={(text) => setForm({...form, email: text})}
              label='Email'
              keyboardType='email-address'
          />
          <CustomInput 
              placeholder='Enter your password'
              value={form.password}
              onChangeText={(text) => setForm({...form, password: text})}
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
            <Text className='base-regular text-gray-100'>Don't have an account? </Text>
            <Link asChild href='/sign-up' className='base-bold text-primary'>
              <Text>Sign Up</Text>
            </Link>
          </View>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({})