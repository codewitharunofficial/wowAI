import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Buffer } from 'buffer';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
global.Buffer = Buffer;



import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }} >
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="music-generation" options={{ title: "Music Generation" }} />
        <Stack.Screen name="voiceover" options={{ title: "Voice Over" }} />
        <Stack.Screen name="chat" options={{ title: 'Chat' }} />
        <Stack.Screen name="dub" options={{ title: 'Dub' }} />
        <Stack.Screen name="speech-to-text" options={{ title: 'Speech to Text' }} />
        <Stack.Screen name="text-to-speech" options={{ title: 'Text to Speech' }} />
        <Stack.Screen name="summarize" options={{ title: 'Summarize' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="voices" options={{ title: 'Voices' }} />
        <Stack.Screen name="models" options={{ title: 'Models' }} />
        <Stack.Screen name="testimonials" options={{ title: 'Testimonials' }} />
      </Stack>
    </ThemeProvider>
  );
}
