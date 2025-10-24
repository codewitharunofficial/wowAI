import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Audio } from 'expo-audio';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TextToSpeechScreen() {
    const [text, setText] = useState('');
    const [selectedVoice, setSelectedVoice] = useState('en-US-Male');
    const [loading, setLoading] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const voices = [
        { label: 'English (Male)', value: 'en-US-Male' },
        { label: 'English (Female)', value: 'en-US-Female' },
        { label: 'British (Male)', value: 'en-GB-Male' },
        { label: 'British (Female)', value: 'en-GB-Female' },
    ];

    const handleGenerate = async () => {
        if (!text.trim()) return;
        setLoading(true);
        setAudioUrl(null);

        try {
            const res = await fetch(`${process.env.EXPO_APP_PUBLIC_URL}/api/tts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, voice: selectedVoice }),
            });

            const data = await res.json();
            setAudioUrl(data.audioUrl);
        } catch (error) {
            console.error('Error generating speech:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePlay = async () => {
        if (!audioUrl) return;

        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: audioUrl },
            { shouldPlay: true }
        );

        setSound(newSound);
        setIsPlaying(true);

        newSound.setOnPlaybackStatusUpdate(status => {
            if (status.didJustFinish) {
                setIsPlaying(false);
            }
        });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Text To Speech</Text>

            {/* Input Field */}
            <View style={styles.textBoxContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type or paste your text here..."
                    placeholderTextColor="#94a3b8"
                    multiline
                    value={text}
                    onChangeText={setText}
                />
            </View>

            {/* Voice Selector */}
            <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownLabel}>Select Voice</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={selectedVoice}
                        dropdownIconColor="#fff"
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedVoice(itemValue)}
                    >
                        {voices.map((v) => (
                            <Picker.Item key={v.value} label={v.label} value={v.value} />
                        ))}
                    </Picker>
                </View>
            </View>

            {/* Generate Button */}
            <TouchableOpacity
                style={[styles.generateButton, loading && { opacity: 0.6 }]}
                onPress={handleGenerate}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <>
                        <Ionicons name="sparkles-outline" size={22} color="#fff" />
                        <Text style={styles.generateText}>Generate Speech</Text>
                    </>
                )}
            </TouchableOpacity>

            {/* Audio Player */}
            {audioUrl && (
                <View style={styles.audioPlayer}>
                    <TouchableOpacity style={styles.playButton} onPress={handlePlay} disabled={loading}>
                        <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.audioInfo}>
                        <Text style={styles.audioLabel}>Streamable Audio</Text>
                        <Text style={styles.audioUrl} numberOfLines={1}>
                            {audioUrl}
                        </Text>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    scrollContent: {
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    textBoxContainer: {
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 14,
        marginBottom: 20,
    },
    textInput: {
        color: '#fff',
        fontSize: 16,
        minHeight: 150,
        textAlignVertical: 'top',
    },
    dropdownContainer: {
        marginBottom: 20,
    },
    dropdownLabel: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 6,
        marginLeft: 4,
    },
    pickerWrapper: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
    },
    picker: {
        color: '#fff',
    },
    generateButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2563eb',
        borderRadius: 25,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    generateText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    audioPlayer: {
        marginTop: 30,
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    playButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#2563eb',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    audioInfo: {
        flex: 1,
    },
    audioLabel: {
        color: '#e2e8f0',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    audioUrl: {
        color: '#94a3b8',
        fontSize: 13,
    },
});
