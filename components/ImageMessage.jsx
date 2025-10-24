import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const ImageMessage = ({ src, isUser }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        { alignItems: isUser ? 'flex-end' : 'flex-start' },
      ]}
    >
      <View
        style={[
          styles.imageWrapper,
          isUser ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Image
          source={{ uri: src }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default ImageMessage;

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 12,
    width: '100%',
  },
  imageWrapper: {
    maxWidth: '75%',
    borderRadius: 18,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#2563eb', // blue bubble for user
    borderBottomRightRadius: 6,
  },
  botBubble: {
    backgroundColor: '#1e293b', // dark gray for bot
    borderBottomLeftRadius: 6,
  },
  image: {
    width: 260,
    height: 260,
    borderRadius: 14,
  },
});
