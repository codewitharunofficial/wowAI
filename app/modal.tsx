import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function About() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>About This App</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🎨 What is this app?</Text>
        <Text style={styles.sectionText}>
          This AI-powered creative suite combines multiple smart tools into one seamless experience.
          From chat and text-to-speech to dubbing, music creation, and transcription —
          everything you need for next-gen content creation is right here.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🧠 Features</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Smart AI Chat Assistant</Text>
          <Text style={styles.listItem}>• Text-to-Speech & Speech-to-Text</Text>
          <Text style={styles.listItem}>• AI Voiceover & Dubbing</Text>
          <Text style={styles.listItem}>• Music & Sound Generation</Text>
          <Text style={styles.listItem}>• Text Summarization</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🚀 Mission</Text>
        <Text style={styles.sectionText}>
          Our goal is to make AI tools accessible, intuitive, and powerful — helping
          creators, students, and professionals bring their ideas to life through intelligent
          voice, language, and audio technologies.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>👨‍💻 Developer</Text>
        <Text style={styles.sectionText}>
          Built with ❤️ using React Native, Expo, and modern AI APIs like ElevenLabs and OpenAI.
        </Text>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => Linking.openURL('https://github.com/codewitharunofficial')}
        >
          <Ionicons name="logo-github" size={20} color="#fff" />
          <Text style={styles.linkText}>Visit GitHub</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => Linking.openURL('mailto:kumarrvee@email.com')}
        >
          <Ionicons name="mail-outline" size={20} color="#fff" />
          <Text style={styles.linkText}>Contact Developer</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        © {new Date().getFullYear()} AI Creative Studio · All Rights Reserved.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: '#0f172a',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    color: '#60a5fa',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionText: {
    color: '#e2e8f0',
    fontSize: 15,
    lineHeight: 22,
  },
  list: {
    marginTop: 4,
  },
  listItem: {
    color: '#e2e8f0',
    fontSize: 15,
    marginVertical: 2,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  linkText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    color: '#64748b',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 15,
  },
});
