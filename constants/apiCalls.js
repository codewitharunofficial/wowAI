import { cacheVoices, getCachedVoices } from "./cachedDataCalls";
const axios = require('axios');

export const getVoices = async (page) => {
    try {

        const voices = await getCachedVoices();

        if (voices && voices?.voices?.length) {
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

    console.log(data?.result);

    return data?.result || [];

}