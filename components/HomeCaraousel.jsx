import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const items = [
    {
        id: '1',
        title: '🎙 Explore Voices',
        description: 'Discover unique AI-generated voices for your projects.',
        icon: 'mic-outline',
        bg: require('../assets/images/explore-voices.png'),
        path: 'voices',
    },
    {
        id: '2',
        title: '🤖 Explore Models',
        description: 'Experiment with different AI models for chat, dubbing, and creativity.',
        icon: 'rocket-outline',
        bg: require('../assets/images/explore-models.png'),
        path: 'models',
    },
    {
        id: '3',
        title: '💬 Testimonials',
        description: 'Hear what creators and developers say about this app.',
        icon: 'chatbubble-ellipses-outline',
        bg: { uri: 'https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&w=1080&q=80' },
        path: 'testimonials',
    },
];

export default function HomeCarousel({ onItemPress }) {
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll logic
    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % items.length;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setCurrentIndex(nextIndex);
        }, 4000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => onItemPress?.(item.path)}
            activeOpacity={0.9}
        >
            <ImageBackground
                source={item.bg}
                style={styles.cardBackground}
                imageStyle={styles.cardImage}
                blurRadius={2}
            >
                <View style={styles.overlay}>
                    <Ionicons name={item.icon} size={32} color="#fff" style={{ marginBottom: 10 }} />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <View style={styles.carouselContainer}>
            <Animated.FlatList
                ref={flatListRef}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment="center"
                decelerationRate="fast"
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            />

            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {items.map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 16, 8],
                        extrapolate: 'clamp',
                    });
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View
                            key={i.toString()}
                            style={[styles.dot, { width: dotWidth, opacity }]}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    carouselContainer: {
        width: width,
        height: 200,
        marginBottom: 20,
    },
    cardContainer: {
        width,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
    },
    cardBackground: {
        flex: 1,
        justifyContent: 'center',
    },
    cardImage: {
        width: width,
        borderRadius: 16,
        objectFit: 'fill'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.45)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 5,
        textAlign: 'center',
    },
    description: {
        color: '#e2e8f0',
        fontSize: 14,
        textAlign: 'center',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginHorizontal: 4,
    },
});
