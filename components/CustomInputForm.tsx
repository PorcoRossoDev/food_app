import { CustomInputFormProps } from '@/type';
import cn from 'clsx';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const CustomInputForm = ({ 
    placeholder = 'Enter text', 
    value, 
    onChangeText, 
    label, 
    secureTextEntry = false,
    keyboardType = 'default',
    classData
}: CustomInputFormProps) => {

    const [isFocused, setIsFocused] = useState(false);
  return (
    <View className='w-full'>
      <Text className='label'>{label}</Text>

      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={'#888'}
        className={cn('input', isFocused ? 'border-primary' : 'border-gray-300', classData)}
      />
    </View>
  )
}

export default CustomInputForm

const styles = StyleSheet.create({})