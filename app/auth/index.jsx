import { Ionicons } from '@expo/vector-icons';
import * as Google from "expo-auth-session/providers/google";
import * as Constants from "expo-constants";
import React, { useState } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: Constants.expoConfig?.extra?.googleSignIn?.androidClientId,
        clientId: Constants.expoConfig?.extra?.googleSignIn?.webClientId,
        iosClientId: Constants.expoConfig?.extra?.googleSignIn.iosClientId,
        redirectUri: `com.codewitharun.vocalify:/auth`,
        scopes: ["profile", "email", "openid"],
        usePKCE: true,
    });

    const handleGoogleSignIn = async () => {
        console.log('Sign in with Google');
        // integrate expo-auth-session or firebase auth here
    };

    const handleAppleSignIn = async () => {
        console.log('Sign in with Apple');
        // integrate expo-apple-authentication here
    };

    return (
        <View style={styles.container}>
            {/* Logo + Welcome */}
            <View style={styles.header}>
                <Image
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/4712/4712100.png',
                    }}
                    style={styles.logo}
                />
                <Text style={styles.title}>Welcome to WoW AI Studio</Text>
                <Text style={styles.subtitle}>
                    {isLogin
                        ? 'Sign in to continue your creative journey'
                        : 'Create an account to get started'}
                </Text>
            </View>

            {/* Auth Card */}
            <View style={styles.card}>
                {/* Google */}
                <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
                    <Ionicons name="logo-google" size={22} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Continue with Google</Text>
                </TouchableOpacity>

                {/* Apple (only iOS) */}
                {Platform.OS === 'ios' && (
                    <TouchableOpacity style={styles.appleButton} onPress={handleAppleSignIn}>
                        <Ionicons name="logo-apple" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.buttonText}>Continue with Apple</Text>
                    </TouchableOpacity>
                )}

                {/* Divider */}
                <View style={styles.dividerContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>or</Text>
                    <View style={styles.line} />
                </View>

                {/* Switch between Login / Signup */}
                <TouchableOpacity
                    style={styles.switchButton}
                    onPress={() => setIsLogin((prev) => !prev)}
                >
                    <Text style={styles.switchText}>
                        {isLogin
                            ? "Don't have an account? "
                            : 'Already have an account? '}
                        <Text style={styles.linkText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <Text style={styles.footer}>
                By continuing, you agree to our <Text style={styles.link}>Terms</Text> &{' '}
                <Text style={styles.link}>Privacy Policy</Text>.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 90,
        height: 90,
        borderRadius: 18,
        marginBottom: 12,
    },
    title: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '700',
    },
    subtitle: {
        color: '#94a3b8',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 4,
        maxWidth: 260,
    },
    card: {
        backgroundColor: '#1e293b',
        borderRadius: 20,
        width: '100%',
        paddingVertical: 28,
        paddingHorizontal: 20,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        alignItems: 'center',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 14,
        width: '100%',
        justifyContent: 'center',
        marginBottom: 14,
    },
    appleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111827',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 14,
        width: '100%',
        justifyContent: 'center',
        marginBottom: 14,
    },
    icon: {
        marginRight: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 18,
        width: '90%',
        justifyContent: 'center',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#334155',
    },
    orText: {
        color: '#64748b',
        marginHorizontal: 8,
        fontSize: 14,
    },
    switchButton: {
        marginTop: 4,
    },
    switchText: {
        color: '#94a3b8',
        fontSize: 14,
    },
    linkText: {
        color: '#60a5fa',
        fontWeight: '600',
    },
    footer: {
        color: '#64748b',
        fontSize: 12,
        textAlign: 'center',
        position: 'absolute',
        bottom: 20,
        width: '100%',
    },
    link: {
        color: '#60a5fa',
    },
});
