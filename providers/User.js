import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();


export const useUser = () => useContext(UserContext);


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const savedUser = await AsyncStorage.getItem("auth");
                if (savedUser) setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to load user:", e);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const login = async (userData) => {
        setUser(userData);
        await AsyncStorage.setItem("auth", JSON.stringify(userData));
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem("auth");
    };

    const getUser = async () => {
        return JSON.parse(await AsyncStorage.getItem("auth")) || null
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, loading, getUser }}>
            {children}
        </UserContext.Provider>
    );
};
