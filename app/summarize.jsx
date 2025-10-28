import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Summarize() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) return alert('Please enter text to summarize.');
    setLoading(true);
    setSummary('');

    try {
      const res = await fetch('http://YOUR_SERVER_IP:3000/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await res.json();
      setSummary(data.summary || 'No summary generated.');
    } catch (error) {
      console.error('Summarization error:', error);
      setSummary('An error occurred while summarizing the text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>AI Text Summarizer</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Paste or type text here..."
        placeholderTextColor="#94a3b8"
        multiline
        value={inputText}
        onChangeText={setInputText}
      />

      <TouchableOpacity
        style={[styles.actionButton, !inputText && { opacity: 0.6 }]}
        disabled={!inputText || loading}
        onPress={handleSummarize}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="document-text-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Summarize Text</Text>
          </>
        )}
      </TouchableOpacity>

      {summary !== '' && (
        <View style={styles.outputBox}>
          <Text style={styles.outputLabel}>Summary</Text>
          <Text style={styles.outputText}>{summary}</Text>
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
    marginBottom: 25,
  },
  textInput: {
    backgroundColor: '#1e293b',
    color: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#2563eb',
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  outputBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginTop: 25,
  },
  outputLabel: { color: '#94a3b8', marginBottom: 6 },
  outputText: { color: '#fff', fontSize: 16, lineHeight: 22 },
});
