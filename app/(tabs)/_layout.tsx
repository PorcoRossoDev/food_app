import { Redirect, Slot } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const _Layout = () => {

    const isAuthenticated = true;
    if (!isAuthenticated) return <Redirect href="/sign-in" />; // Nếu chưa đăng nhập thì chuyển hướng đến trang đăng ký
    return <Slot />;
}

export default _Layout

const styles = StyleSheet.create({})