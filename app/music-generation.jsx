import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator, ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';

export default function MusicGenerationScreen() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [musicUrl, setMusicUrl] = useState(null);

  const handleGenerateMusic = async () => {
    if (!prompt.trim()) return alert('Enter a prompt.');
    setLoading(true);
    // Simulate backend request
    setTimeout(() => {
      setMusicUrl('https://example.com/generated-music.mp3');
      setLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>AI Music Generator</Text>

      <TextInput
        style={styles.input}
        placeholder="Describe the music you want (e.g., 'lofi chill beats with piano')"
        placeholderTextColor="#94a3b8"
        multiline
        value={prompt}
        onChangeText={setPrompt}
      />

      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleGenerateMusic}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="musical-notes-outline" size={22} color="#fff" />
            <Text style={styles.actionText}>Generate Music</Text>
          </>
        )}
      </TouchableOpacity>

      {musicUrl && (
        <View style={styles.outputBox}>
          <Text style={styles.outputLabel}>Generated Music</Text>
          <Text style={styles.outputText}>{musicUrl}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  scroll: { padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    borderRadius: 12,
    padding: 14,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#2563eb',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  actionText: { color: '#fff', fontWeight: '600', fontSize: 16, marginLeft: 8 },
  outputBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginTop: 25,
  },
  outputLabel: { color: '#94a3b8', marginBottom: 6 },
  outputText: { color: '#fff' },
});
