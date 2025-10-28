import AsyncStorage from "@react-native-async-storage/async-storage";

export const cacheVoices = async (voices) => {
    await AsyncStorage.setItem('voices', JSON.stringify(voices));
    console.log("Saved Voices");
}


export const getCachedVoices = async () => {
    const voices = JSON.parse(await AsyncStorage.getItem('voices') || []);
    // console.log("Saved: ", voices);
    return voices;
}