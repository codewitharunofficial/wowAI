import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// For real playback, you can import Video from 'expo-av'
// import { Video } from 'expo-av';

const VideoMessage = ({ src, isUser }) => {
    return (
        <View
            style={[
                styles.messageContainer,
                { alignItems: isUser ? 'flex-end' : 'flex-start' },
            ]}
        >
            <View
                style={[
                    styles.bubble,
                    isUser ? styles.userBubble : styles.botBubble,
                ]}
            >
                <Text
                    style={[
                        styles.labelText,
                        isUser ? styles.userText : styles.botText,
                    ]}
                >
                    🎬 Video Message
                </Text>

                {/* Replace this block with a real video player later */}
                <View style={styles.videoPlaceholder}>
                    <Text style={styles.placeholderText}>Video Source:</Text>
                    <Text
                        style={[
                            styles.videoUrl,
                            isUser ? styles.userText : styles.botText,
                        ]}
                        numberOfLines={1}
                    >
                        {src}
                    </Text>
                </View>

                {/* Example for actual playback:
          <Video
            source={{ uri: src }}
            style={styles.video}
            useNativeControls
            resizeMode="cover"
          />
        */}
            </View>
        </View>
    );
};

export default VideoMessage;

const styles = StyleSheet.create({
    messageContainer: {
        marginBottom: 12,
        width: '100%',
    },
    bubble: {
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
        backgroundColor: '#2563eb', // blue
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
    videoPlaceholder: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#475569',
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    placeholderText: {
        fontSize: 13,
        opacity: 0.8,
        marginBottom: 4,
    },
    videoUrl: {
        fontSize: 13,
        fontStyle: 'italic',
    },
    userText: {
        color: '#fff',
    },
    botText: {
        color: '#e2e8f0',
    },
});
