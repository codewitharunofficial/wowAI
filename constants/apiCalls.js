import { cacheVoices, getCachedVoices } from "./cachedDataCalls";
const axios = require('axios');

export const getVoices = async (page) => {
    try {

        const voices = await getCachedVoices();

        if (voices) {
            return { success: true, voices: voices };
        } else {
            const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/voices?page=${page}`);
            if (!res.ok) throw new Error('Failed to fetch voices');
            const data = await res.json();
            cacheVoices(data);
            return data;
        }

    } catch (error) {
        console.error('Error fetching voices:', error);
        return [];
    }
};


export const messageAI = async (text) => {

    const options = {
        method: 'POST',
        url: 'https://chat-gpt26.p.rapidapi.com/',
        headers: {
            'x-rapidapi-key': process.env.EXPO_PUBLIC_CHAT_API_KEY,
            'x-rapidapi-host': 'chat-gpt26.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            model: 'GPT-5-mini',
            messages: [
                {
                    role: 'user',
                    content: text
                }
            ]
        }
    };

    const { data } = await axios.request(options);

    console.log(data?.choices);

    return data?.choices || [];

}