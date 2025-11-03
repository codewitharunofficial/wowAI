import AudioMessage from '@/components/AudioMessage';
import ImageMessage from '@/components/ImageMessage';
import TextMessage from '@/components/TextMessage';
import VideoMessage from '@/components/VideoMessage';
import { messageAI } from '@/constants/apiCalls';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function ChatScreen() {
    const [messages, setMessages] = useState([{ id: uuidv4().toString(), type: 'text', role: "assistant", content: "Hey! How May I Help You?" }]);
    const [input, setInput] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [generating, setGenerating] = useState(false);
    const { height } = Dimensions.get("window");
    const [error, setError] = useState("")

    const handleSend = async () => {
        try {
            if (!input.trim()) return;
            setGenerating(true);
            let text = input.trim();
            setInput("");
            Keyboard.dismiss();
            messages.pop();
            messages.push({ id: uuidv4().toString(), type: 'text', role: "user", content: text });
            const newMessage = await messageAI(input);
            if (newMessage) {
                messages.push({ id: uuidv4().toString(), type: 'text', role: "assistant", content: newMessage })
            }
            setGenerating(false);

        } catch (error) {
            console.log(error);
            setGenerating(false);
            messages.push({ id: uuidv4().toString(), type: 'text', role: "assistant", content: "Something went wrong! Unable to generate AI response right now, Please try again later." })

        }
    };

    const handleAttachmentSelect = (type) => {
        setModalVisible(false);
        // Simulate adding a media message
        const dummyMsg = {
            id: Date.now().toString(),
            type,
            isUser: true,
            content:
                type === 'image'
                    ? 'https://placekitten.com/300/300'
                    : type === 'video'
                        ? 'https://www.w3schools.com/html/mov_bbb.mp4'
                        : type === 'audio'
                            ? 'https://www.w3schools.com/html/horse.mp3'
                            : 'sample.pdf',
        };
        setMessages(prev => [...prev, dummyMsg]);
    };

    const renderMessage = ({ item }) => {
        switch (item.type) {
            case 'image':
                return <ImageMessage content={item.content} isUser={item.isUser} />;
            case 'video':
                return <VideoMessage content={item.content} isUser={item.isUser} />;
            case 'audio':
                return <AudioMessage content={item.content} isUser={item.isUser} />;
            default:
                return <TextMessage content={item.content} isUser={item.role === "user" ? true : false} />;
        }
    };


    const LoadingMessage = () => {
        return (
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 10, opacity: 0.5 }} >
                <Text style={{ color: 'white' }} >Generating</Text>
                <ActivityIndicator size={"small"} color={"white"} />
            </TouchableOpacity>
        )
    }

    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={height * 0.14}
        >
            {/* Chat area */}
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.chatContainer}
                ListFooterComponent={generating && <LoadingMessage />}
            />

            {/* Input area */}
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
                    <Ionicons name="attach" size={22} color="#fff" />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    placeholderTextColor="#aaa"
                    value={input}
                    onChangeText={setInput}
                />

                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <Ionicons name="send" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Attachment modal */}
            <Modal
                transparent
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Attach a file</Text>

                        <View style={styles.modalOptions}>
                            <TouchableOpacity
                                style={styles.optionButton}
                                onPress={() => handleAttachmentSelect('image')}
                            >
                                <MaterialIcons name="image" size={28} color="#2563eb" />
                                <Text style={styles.optionText}>Image</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.optionButton}
                                onPress={() => handleAttachmentSelect('video')}
                            >
                                <MaterialIcons name="videocam" size={28} color="#16a34a" />
                                <Text style={styles.optionText}>Video</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.optionButton}
                                onPress={() => handleAttachmentSelect('audio')}
                            >
                                <MaterialIcons name="audiotrack" size={28} color="#f59e0b" />
                                <Text style={styles.optionText}>Audio</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.optionButton}
                                onPress={() => handleAttachmentSelect('document')}
                            >
                                <MaterialIcons name="insert-drive-file" size={28} color="#ef4444" />
                                <Text style={styles.optionText}>Document</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalBtn}>
                            <Text style={styles.closeModalText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a', // dark background
    },
    chatContainer: {
        padding: 12,
        paddingBottom: 80,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e293b',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#334155',
    },
    input: {
        flex: 1,
        backgroundColor: '#334155',
        color: '#fff',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        marginHorizontal: 8,
    },
    iconButton: {
        backgroundColor: '#334155',
        padding: 10,
        borderRadius: 25,
    },
    sendButton: {
        backgroundColor: '#2563eb',
        padding: 12,
        borderRadius: 25,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15,23,42,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        width: '80%',
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 20,
    },
    modalOptions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    optionButton: {
        alignItems: 'center',
    },
    optionText: {
        marginTop: 6,
        color: '#0f172a',
        fontSize: 14,
        fontWeight: '500',
    },
    closeModalBtn: {
        backgroundColor: '#2563eb',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 24,
    },
    closeModalText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});
