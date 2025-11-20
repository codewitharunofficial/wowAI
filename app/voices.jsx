import { getVoices } from '@/constants/apiCalls';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ExploreVoices() {
  const [search, setSearch] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const playerRef = useRef(null);



  const handlePlayPreview = async (voice) => {
    if (!voice.previewUrl) return alert('No preview available for this voice.');

    try {
      setPlayingId(voice.voiceId);
      setLoading(true);
      console.log(voice.previewUrl);
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: voice.previewUrl });
      if (sound._loaded) {
        await sound.playAsync();
        playerRef.current = sound;
        setLoading(false);
      }
    } catch (error) {
      console.error('Error playing preview:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (voice) => {
    setSelectedVoice(voice.voiceId);
  };

  useEffect(() => {
    getVoices().then((data) => { console.log(data); setVoices(data) }).catch((error) => console.error('Error fetching voices:', error));
  }, []);

  const renderVoice = ({ item }) => {
    const isSelected = selectedVoice === item.voiceId;
    const isPlaying = playingId === item.voiceId;

    return (
      <View style={[styles.card, isSelected && styles.selectedCard]}>
        <View style={styles.infoRow}>
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person-circle-outline" size={40} color="#94a3b8" />
            </View>
          )}

          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.tags}>
              <Text style={styles.tag}>{item.language?.toUpperCase() || 'N/A'}</Text>
              <Text style={styles.tag}>{item.gender}</Text>
              <Text style={styles.tag}>{item.accent}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handlePlayPreview(item)}
            disabled={loading}
          >
            {isPlaying ? (
              <ActivityIndicator color="#007AFF" />
            ) : (
              <Ionicons name="play-circle-outline" size={28} color="#007AFF" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.selectButton,
              isSelected ? styles.selectedButton : styles.defaultButton,
            ]}
            onPress={() => handleSelect(item)}
          >
            <Text
              style={[
                styles.buttonText,
                isSelected ? styles.selectedText : styles.defaultText,
              ]}
            >
              {isSelected ? 'Selected' : 'Select'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#64748b" style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Search voices..."
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {
        voices?.length > 0 ? (
          <FlatList
            data={voices}
            keyExtractor={(item) => item.voiceId}
            renderItem={renderVoice}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        ) : (

          <ActivityIndicator size={"large"} color={"#fff"} />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingHorizontal: 16, paddingTop: 60 },
  header: { fontSize: 26, fontWeight: '700', color: '#fff', marginBottom: 20 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 16, color: '#fff' },
  list: { paddingBottom: 40 },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  selectedCard: { borderWidth: 1.5, borderColor: '#2563eb' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: { flex: 1 },
  name: { color: '#fff', fontSize: 18, fontWeight: '600' },
  desc: { color: '#cbd5e1', fontSize: 14, marginTop: 2 },
  tags: { flexDirection: 'row', marginTop: 6, flexWrap: 'wrap' },
  tag: {
    backgroundColor: '#334155',
    color: '#e2e8f0',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
  },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  iconButton: { marginRight: 10 },
  selectButton: { borderRadius: 20, paddingVertical: 6, paddingHorizontal: 14 },
  defaultButton: { backgroundColor: '#334155' },
  selectedButton: { backgroundColor: '#2563eb' },
  buttonText: { fontSize: 14, fontWeight: '600' },
  defaultText: { color: '#e2e8f0' },
  selectedText: { color: '#fff' },
});
