import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import {
  ActivityIndicator, ScrollView,
  StyleSheet,
  Text, TouchableOpacity,
  View
} from 'react-native';

export default function DubScreen() {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('es');
  const [loading, setLoading] = useState(false);
  const [dubUrl, setDubUrl] = useState(null);

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['audio/*', 'video/*'],
    });
    if (!result.canceled) setFile(result.assets[0]);
  };

  const handleGenerateDub = async () => {
    if (!file) return alert('Please upload a file.');
    setLoading(true);
    setTimeout(() => {
      setDubUrl('https://example.com/dubbed.mp3');
      setLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>AI Dub Generator</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={handlePickFile}>
        <Ionicons name="cloud-upload-outline" size={30} color="#fff" />
        <Text style={styles.uploadText}>{file ? 'Change File' : 'Upload File'}</Text>
      </TouchableOpacity>

      {file && <Text style={styles.fileText}>Selected: {file.name}</Text>}

      <View style={styles.dropdown}>
        <Text style={styles.label}>Select Target Language:</Text>
        <Picker
          selectedValue={language}
          onValueChange={setLanguage}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Spanish" value="es" color="#fff" />
          <Picker.Item label="French" value="fr" color="#fff" />
          <Picker.Item label="German" value="de" color="#fff" />
          <Picker.Item label="Hindi" value="hi" color="#fff" />
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleGenerateDub}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="language-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Generate Dub</Text>
          </>
        )}
      </TouchableOpacity>

      {dubUrl && (
        <View style={styles.outputBox}>
          <Text style={styles.outputLabel}>Dubbed Audio Ready</Text>
          <Text style={styles.outputText}>{dubUrl}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...StyleSheet.flatten({
    container: { flex: 1, backgroundColor: '#0f172a' },
    scroll: { padding: 20 },
    title: {
      fontSize: 26, fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: 25,
    },
    uploadButton: {
      backgroundColor: '#2563eb', padding: 16, borderRadius: 14,
      flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
      marginBottom: 10,
    },
    uploadText: { color: '#fff', fontWeight: '600', fontSize: 16, marginLeft: 8 },
    fileText: { color: '#94a3b8', textAlign: 'center', marginBottom: 10 },
    dropdown: { marginTop: 10, backgroundColor: '#1e293b', borderRadius: 12 },
    label: { color: '#94a3b8', padding: 10, fontSize: 14 },
    picker: { color: '#fff' },
    actionButton: {
      backgroundColor: '#1d4ed8', paddingVertical: 16, borderRadius: 14,
      flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
      marginTop: 20,
    },
    actionText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 8 },
    outputBox: { backgroundColor: '#1e293b', borderRadius: 12, padding: 16, marginTop: 20 },
    outputLabel: { color: '#94a3b8', marginBottom: 6 },
    outputText: { color: '#fff' },
  }),
});
