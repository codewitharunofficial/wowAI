import AsyncStorage from "@react-native-async-storage/async-storage";

export const cacheVoices = async (voices) => {
    await AsyncStorage.setItem('voices', JSON.stringify(voices));
    console.log("Saved Voices");
}


export const getCachedVoices = async () => {
    let voices = await AsyncStorage.getItem('voices');
    voices = JSON.parse(voices)
    return voices?.voices?.length > 0 ? voices?.voices : [];
}

export const getUser = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("auth")) || null;
    return user;
}