import { useUser } from "@/providers/User";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
    const { user, logout } = useUser();

    const subscription =
        user?.subscription || {
            type: "Free Plan",
            description: "Basic access with limited features.",
        };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.headerTitle}>My Profile</Text>

            {/* Profile Card */}
            <View style={styles.profileCard}>
                {user?.photoURL ? (
                    <Image source={{ uri: user.photoURL }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarPlaceholder}>
                        <Ionicons name="person-circle-outline" size={80} color="#94a3b8" />
                    </View>
                )}

                <Text style={styles.username}>{user?.name || "Guest User"}</Text>
                <Text style={styles.email}>{user?.email || "Not signed in"}</Text>
            </View>

            {/* Subscription Section */}
            <View style={styles.subCard}>
                <Text style={styles.subTitle}>Subscription</Text>
                <Text style={styles.subType}>{subscription.type}</Text>
                <Text style={styles.subDesc}>{subscription.description}</Text>

                {subscription.type === "Free Plan" && (
                    <TouchableOpacity
                        style={styles.upgradeButton}
                        onPress={() => alert("Upgrade feature coming soon 🚀")}
                    >
                        <Text style={styles.upgradeText}>Upgrade to Premium</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={() => {logout; router.replace("/auth")}}>
                <Ionicons name="log-out-outline" size={20} color="#fff" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f172a",
        alignItems: "center",
        paddingTop: 60,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 30,
    },
    profileCard: {
        backgroundColor: "#1e293b",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        width: "85%",
        marginBottom: 20,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 12,
    },
    avatarPlaceholder: {
        marginBottom: 12,
    },
    username: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    },
    email: {
        color: "#94a3b8",
        fontSize: 14,
        marginTop: 4,
    },
    subCard: {
        backgroundColor: "#1e293b",
        borderRadius: 20,
        padding: 20,
        width: "85%",
        alignItems: "center",
        marginBottom: 30,
    },
    subTitle: {
        color: "#60a5fa",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    subType: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    subDesc: {
        color: "#94a3b8",
        fontSize: 14,
        textAlign: "center",
        marginTop: 6,
    },
    upgradeButton: {
        marginTop: 16,
        backgroundColor: "#2563eb",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    upgradeText: {
        color: "#fff",
        fontWeight: "600",
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#dc2626",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 14,
        width: "85%",
        justifyContent: "center",
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 8,
    },
});
