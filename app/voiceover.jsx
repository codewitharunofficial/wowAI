import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import {
  ActivityIndicator, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function VoiceoverScreen() {
  const [script, setScript] = useState('');
  const [audioRef, setAudioRef] = useState(null);
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState(null);

  const handlePickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['audio/*'],
    });
    if (!result.canceled) setAudioRef(result.assets[0]);
  };

  const handleGenerateVoiceover = async () => {
    if (!script.trim() && !audioRef) return alert('Add a script or audio reference!');
    setLoading(true);
    // Call your backend here...
    setTimeout(() => {
      setOutputUrl('https://example.com/voiceover.mp3');
      setLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>AI Voiceover</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your script here..."
        placeholderTextColor="#94a3b8"
        multiline
        value={script}
        onChangeText={setScript}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={handlePickAudio}>
        <Ionicons name="mic-outline" size={28} color="#fff" />
        <Text style={styles.uploadText}>
          {audioRef ? 'Change Reference Audio' : 'Upload Reference Audio'}
        </Text>
      </TouchableOpacity>

      {audioRef && (
        <Text style={styles.fileText}>Selected: {audioRef.name}</Text>
      )}

      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleGenerateVoiceover}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="sparkles-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Generate Voiceover</Text>
          </>
        )}
      </TouchableOpacity>

      {outputUrl && (
        <View style={styles.outputBox}>
          <Text style={styles.outputLabel}>Generated Voiceover</Text>
          <Text style={styles.outputText}>File ready: {outputUrl}</Text>
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
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 10 },
  fileText: { color: '#94a3b8', textAlign: 'center', marginBottom: 10 },
  actionButton: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  actionText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  outputBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  outputLabel: { color: '#94a3b8', marginBottom: 6 },
  outputText: { color: '#fff' },
});
