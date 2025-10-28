import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
    Dimensions,
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
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
        bg: 'https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&w=1080&q=80',
        path: 'testimonials',
    },
];

export default function HomeCarousel({ onItemPress }) {
    const flatListRef = useRef(null);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => onItemPress?.(item.path)}
            activeOpacity={0.9}
        >
            <ImageBackground
                source={{ uri: item.bg }}
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
            <FlatList
                ref={flatListRef}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment="center"
                decelerationRate="fast"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    carouselContainer: {
        width: width * 0.9,
        height: 200,
        marginBottom: 20,
    },
    cardContainer: {
        width: width * 0.85,
        marginHorizontal: width * 0.025,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
    },
    cardBackground: {
        flex: 1,
        justifyContent: 'center',
    },
    cardImage: {
        borderRadius: 16,
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
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 5,
        textAlign: 'center',
    },
    description: {
        color: '#e2e8f0',
        fontSize: 14,
        textAlign: 'center',
    },
});
