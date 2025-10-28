import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Drawer } from 'expo-router/drawer';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function DrawerIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        drawerType: "front",
        drawerContentContainerStyle: { backgroundColor: "#ccc", height: "100%", width: "100%", paddingTop: 75 },
        // drawerInactiveTintColor: "#888",
        drawerAllowFontScaling: true,
        drawerStatusBarAnimation: "fade"
      }}>

      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => <DrawerIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          drawerIcon: ({ color }) => <DrawerIcon name="settings" color={color} />,
        }}
      />
    </Drawer>
  );
}

function DrawerHeader() {
  return (
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#222', marginBottom: 10 }}>
      <Ionicons name="logo-react" size={40} color="#61dafb" />
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Vocalify</Text>
        <Text style={{ color: '#aaa', fontSize: 14 }}>AI Voice Solutions</Text>
      </View>
    </View>
  )
}
