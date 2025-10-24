import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AudioMessage = ({ src, isUser }) => {
    return (
        <View
            style={[
                styles.messageContainer,
                { alignItems: isUser ? 'flex-end' : 'flex-start' },
            ]}
        >
            <View
                style={[
                    styles.audioWrapper,
                    isUser ? styles.userBubble : styles.botBubble,
                ]}
            >
                <Text
                    style={[
                        styles.labelText,
                        isUser ? styles.userText : styles.botText,
                    ]}
                >
                    🎧 Audio Message
                </Text>

                <View style={styles.audioPlayer}>
                    <TouchableOpacity style={styles.playButton}>
                        <Ionicons
                            name="play"
                            size={22}
                            color={isUser ? '#fff' : '#e2e8f0'}
                        />
                    </TouchableOpacity>

                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBarFill} />
                    </View>

                    <Text
                        style={[
                            styles.duration,
                            isUser ? styles.userText : styles.botText,
                        ]}
                    >
                        0:30
                    </Text>
                </View>

                {/* Example for real audio playback:
          <Audio
            source={{ uri: src }}
            useNativeControls
            style={styles.audioPlayer}
          />
        */}
            </View>
        </View>
    );
};

export default AudioMessage;

const styles = StyleSheet.create({
    messageContainer: {
        marginBottom: 12,
        width: '100%',
    },
    audioWrapper: {
        maxWidth: '80%',
        borderRadius: 18,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },
    userBubble: {
        backgroundColor: '#2563eb', // bright blue
        borderBottomRightRadius: 5,
    },
    botBubble: {
        backgroundColor: '#1e293b', // dark gray
        borderBottomLeftRadius: 5,
    },
    labelText: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 6,
    },
    audioPlayer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    progressBarContainer: {
        flex: 1,
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 3,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    progressBarFill: {
        width: '40%',
        height: '100%',
        backgroundColor: '#22c55e', // green progress
    },
    duration: {
        fontSize: 13,
        fontWeight: '500',
    },
    userText: {
        color: '#fff',
    },
    botText: {
        color: '#e2e8f0',
    },
});
