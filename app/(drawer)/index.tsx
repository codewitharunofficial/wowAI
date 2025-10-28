import HomeCarousel from '@/components/HomeCaraousel';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ExternalPathString, RelativePathString, router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const features = [
    { id: 1, title: 'Text-To-Speech', icon: 'volume-high', iconLib: Ionicons, color: '#3b82f6' },
    { id: 2, title: 'Speech-To-Text', icon: 'keyboard-voice', iconLib: MaterialIcons, color: '#22c55e' },
    { id: 3, title: 'Voiceover', icon: 'microphone-alt', iconLib: FontAwesome5, color: '#f97316' },
    { id: 4, title: 'Dub', icon: 'translate', iconLib: MaterialIcons, color: '#eab308' },
    { id: 5, title: 'Chat', icon: 'chatbubbles', iconLib: Ionicons, color: '#8b5cf6' },
    { id: 6, title: 'Summarize', icon: 'summarize', iconLib: MaterialIcons, color: '#ec4899' },
    { id: 7, title: 'Music-Generation', icon: 'music-note', iconLib: MaterialIcons, color: '#10b981' },
];


function onItemPress(path: RelativePathString | ExternalPathString) {
    router.push(path);
}

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
            {/* <Text style={styles.header}>Vocalify Labs</Text> */}

            <View style={styles.grid}>
                {features.map(({ id, title, icon, iconLib: Icon, color }) => (
                    <TouchableOpacity
                        key={id}
                        style={styles.card}
                        activeOpacity={0.8}
                        onPress={() => router.push(`/${title.replace(/\s+/g, '').toLowerCase()}`)}
                    >
                        <View style={[styles.iconWrapper, { backgroundColor: color }]}>
                            <Icon name={icon} size={26} color="#fff" />
                        </View>
                        <Text style={styles.cardTitle}>{title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{ paddingVertical: 10, }}>
                <Text style={styles.header}>Explore More</Text>
                <HomeCarousel onItemPress={onItemPress} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    scrollContainer: {
        paddingVertical: 30,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 26,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 24,
        textAlign: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '30%',
        backgroundColor: '#1e293b',
        borderRadius: 16,
        paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    iconWrapper: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#e2e8f0',
        textAlign: 'center',
    },
});
