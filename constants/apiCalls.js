import { cacheVoices, getCachedVoices } from "./cachedDataCalls";
const axios = require('axios');

export const getVoices = async (page) => {
    try {

        const voices = await getCachedVoices();

        if (voices && voices?.voices) {
            return { success: true, voices: voices };
        } else {
            const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/voices?page=${page}`);
            if (!res.ok) throw new Error('Failed to fetch voices');
            const data = await res.json();
            cacheVoices(data);
            return data?.voices;
        }

    } catch (error) {
        console.error('Error fetching voices:', error);
        return [];
    }
};


export const messageAI = async (text) => {

    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
        headers: {
            'x-rapidapi-key': process.env.EXPO_PUBLIC_CHAT_API_KEY,
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            messages: [
                {
                    role: 'user',
                    content: text
                }
            ],
            web_access: false
        }
    };

    const { data } = await axios.request(options);

    // console.log(data?.result);

    return data?.result || [];

}


export const createNewChat = async (userId, title) => {
    try {
        const { data } = await axios.post(`${EXPO_PUBLIC_BASE_URL}/api/create-chat`, { userId, title });
        if (data.success) {
            return data?.chat;
        }
    } catch (error) {
        console.log(error);
    }
};


export const pushMessageToDB = async (message) => {
    try {
        const { data } = await axios.post(`${EXPO_PUBLIC_BASE_URL}/api/push-message`, { message: message })
        if (data?.success) {
            return data?.messages
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}