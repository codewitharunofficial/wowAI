import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function SpeechToTextScreen() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState('');

  // Pick an audio file
  const handlePickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/*'],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const selectedFile = result.assets[0];
      setFile(selectedFile);
      setTranscript('');
    } catch (err) {
      console.error('Error picking file:', err);
    }
  };

  // Send audio to backend for transcription
  const handleTranscribe = async () => {
    if (!file) return alert('Please upload an audio file first.');

    setLoading(true);
    setTranscript('');

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        name: file.name || 'audio.mp3',
        type: file.mimeType || 'audio/mpeg',
      });

      const res = await fetch('http://YOUR_SERVER_IP:3000/api/stt', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await res.json();
      if (data?.text) {
        setTranscript(data.text);
      } else {
        setTranscript('No text recognized.');
      }
    } catch (err) {
      console.error('Transcription error:', err);
      setTranscript('Error while transcribing audio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Speech To Text</Text>

      {/* Upload Box */}
      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={handlePickAudio}>
          <Ionicons name="cloud-upload-outline" size={40} color="#fff" />
          <Text style={styles.uploadText}>
            {file ? 'Change Audio File' : 'Upload Audio File'}
          </Text>
        </TouchableOpacity>

        {file && (
          <View style={styles.fileInfo}>
            <Ionicons name="musical-note-outline" size={22} color="#94a3b8" />
            <Text style={styles.fileName}>{file.name}</Text>
          </View>
        )}
      </View>

      {/* Transcribe Button */}
      <TouchableOpacity
        style={[styles.transcribeButton, !file && { opacity: 0.5 }]}
        onPress={handleTranscribe}
        disabled={!file || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="mic-outline" size={22} color="#fff" />
            <Text style={styles.transcribeText}>Transcribe Audio</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Transcription Output */}
      {transcript !== '' && (
        <View style={styles.outputBox}>
          <Text style={styles.outputLabel}>Transcription Result</Text>
          <Text style={styles.outputText}>{transcript}</Text>
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
    marginBottom: 30,
  },
  uploadContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#1e293b',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: '90%',
  },
  fileName: {
    color: '#e2e8f0',
    fontSize: 15,
    marginLeft: 8,
  },
  transcribeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 25,
    paddingVertical: 14,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  transcribeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  outputBox: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginTop: 30,
  },
  outputLabel: {
    color: '#94a3b8',
    fontSize: 15,
    marginBottom: 6,
  },
  outputText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
});
