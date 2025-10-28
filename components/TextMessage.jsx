import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TextMessage = ({ content, isUser }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        { alignItems: isUser ? 'flex-end' : 'flex-start' },
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text
          selectable={true}
          selectionColor={'skyblue'}
          style={[
            styles.messageText,
            isUser ? styles.userText : styles.botText,
          ]}
        >
          {content}
        </Text>
      </View>
    </View>
  );
};

export default TextMessage;

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 10,
    width: '100%',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#2563eb', // bright blue
    borderBottomRightRadius: 5,
  },
  botBubble: {
    backgroundColor: '#1e293b', // dark gray
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
    fontWeight: '500',
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#e2e8f0',
  },
});
