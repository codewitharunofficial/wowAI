import { UserProvider } from '@/providers/User';
import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

const AuthLayout = () => {
    return (
        <UserProvider>
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <StatusBar barStyle={'light-content'} />
            </Stack>
        </UserProvider>
    )
}

export default AuthLayout;
