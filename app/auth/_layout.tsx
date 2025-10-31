import { UserProvider } from '@/providers/User';
import { Stack } from 'expo-router';
import React from 'react';

const AuthLayout = () => {
    return (
        <UserProvider>
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
            </Stack>
        </UserProvider>
    )
}

export default AuthLayout;
