import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const ChatsList = () => {
    const [search, setSearch] = useState('');
    const [chats] = useState([
        { title: "Expo App UI Components", id: 0 },
        { title: "React Native Design Patterns", id: 1 },
        { title: "Voice Assistant Prototype", id: 2 },
        { title: "AI Chat Feature", id: 3 },
        { title: "Music Generation Chat", id: 4 },
    ]);

    const filteredChats = chats.filter(chat =>
        chat.title.toLowerCase().includes(search.toLowerCase())
    );

    const renderChats = ({ item }) => (
        <TouchableOpacity onPress={() => router.push({pathname: '/messages', params: {title: ''}})} style={styles.chatCard} activeOpacity={0.8}>
            <View style={styles.avatarWrapper}>
                <Image
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/4712/4712100.png",
                    }}
                    style={styles.avatar}
                />
            </View>
            <View style={styles.chatInfo}>
                <Text style={styles.chatTitle}>{item.title}</Text>
                <Text style={styles.chatSubtitle}>Tap to open chat</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Recent Chats</Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search chats..."
                    placeholderTextColor="#9ca3af"
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                />
            </View>

            {/* Chat List */}
            <FlatList
                data={filteredChats}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderChats}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default ChatsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    header: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    searchContainer: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    searchInput: {
        color: '#fff',
        fontSize: 16,
        flex: 1,
    },
    list: {
        paddingBottom: 40,
    },
    chatCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    avatarWrapper: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    chatInfo: {
        flex: 1,
    },
    chatTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    chatSubtitle: {
        color: '#9ca3af',
        fontSize: 13,
        marginTop: 2,
    },
});
