import socketServcies from "@/constants/SocketServices";
import { useUser } from "@/providers/User";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function AuthScreen() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [step, setStep] = useState("email"); // "email" or "otp"
    const [loading, setLoading] = useState(false);
    const [isotpExpired, setIsOtpExpired] = useState(false);
    const [errorSendingOtp, setErrorSendingOtp] = useState(false);

    const { login } = useUser();

    const otpRefs = useRef([]);

    const handleEmailSubmit = async () => {
        if (!email.trim() || !email.includes("@")) {
            alert("Please enter a valid email address");
            return;
        }

        setLoading(true);
        try {
            socketServcies.emit('send-otp', { email: email });
        } catch (e) {
            alert("Error sending OTP");
            console.log(e?.message);
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (codeParam) => {
        const code = codeParam || otp.join("");
        if (code.length !== 6) {
            alert("Please enter a valid OTP");
            return;
        }

        try {
            setLoading(true);
            socketServcies.emit('verify-otp', { email: email, otp: otp });
        } catch {
            alert("Error verifying OTP");
            setLoading(false)
        }
    };


    const handleOtpChange = (text, index) => {
        if (text.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < otpRefs.current.length - 1) {
            otpRefs.current[index + 1].focus();
        }

        // Auto-submit if all 6 digits filled
        if (newOtp.every((digit) => digit !== "")) {
            handleOtpSubmit(newOtp.join(""));
        }
    };

    const handleOtpKeyPress = (e, index) => {
        if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    const handleChangeEmail = async () => {

    }


    useEffect(() => {
        socketServcies.on('otp-sent', ({ }) => {
            setLoading(false);
            setStep("otp");
        });

        socketServcies.on('otp-verified', ({ user }) => {
            setLoading(false);
            login(user);
            router.replace("/(drawer)");
        });

        socketServcies.on('otp-verification-failed', ({ }) => {
            setIsOtpExpired(true);
            setLoading(false);
        });

        socketServcies.on('failed-to-send-otp', ({ }) => {
            setStep("email");
            setErrorSendingOtp(true);
            setLoading(false);
        });

    }, []);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.header}>
                <Image
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/4712/4712100.png",
                    }}
                    style={styles.logo}
                />
                <Text style={styles.title}>Welcome to WoW AI Studio</Text>
                <Text style={styles.subtitle}>
                    {step === "email"
                        ? "Sign in with your email to continue"
                        : `Enter the 6-digit code sent to ${email}`}
                </Text>
            </View>

            <View style={styles.card}>
                {step === "email" ? (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#94a3b8"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <TouchableOpacity
                            style={[styles.button, loading && { opacity: 0.6 }]}
                            onPress={handleEmailSubmit}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>
                                {loading && !errorSendingOtp ? "Sending..." : loading && errorSendingOtp ? "Try Again" : "Continue"}
                            </Text>
                        </TouchableOpacity>

                        {
                            errorSendingOtp && (
                                <Text style={{ color: 'red', textAlign: 'center', alignItems: 'center' }}>Error While Getting OTP</Text>
                            )
                        }
                    </>
                ) : (
                    <>
                        <View style={styles.otpContainer}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => (otpRefs.current[index] = ref)}
                                    style={styles.otpInput}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    value={digit}
                                    onChangeText={(text) => handleOtpChange(text, index)}
                                    onKeyPress={(e) => handleOtpKeyPress(e, index)}
                                />
                            ))}
                        </View>

                        <TouchableOpacity
                            style={[styles.button, { marginTop: 20 }]}
                            onPress={() => handleOtpSubmit()}
                        >
                            <Text style={styles.buttonText}>{loading ? "Verifiying..." : "Verify OTP"}</Text>
                        </TouchableOpacity>

                        <View style={styles.otpActions}>
                            <TouchableOpacity onPress={handleEmailSubmit}>
                                <Text style={styles.resendText}>Resend OTP</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleChangeEmail}>
                                <Text style={styles.changeEmailText}>Change Email</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>

            <Text style={styles.footer}>
                By continuing, you agree to our <Text style={styles.link}>Terms</Text> &{" "}
                <Text style={styles.link}>Privacy Policy</Text>.
            </Text>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f172a",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    header: {
        alignItems: "center",
        marginBottom: 40,
    },
    logo: {
        width: 90,
        height: 90,
        borderRadius: 18,
        marginBottom: 12,
    },
    title: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "700",
    },
    subtitle: {
        color: "#94a3b8",
        fontSize: 15,
        textAlign: "center",
        marginTop: 4,
        maxWidth: 260,
    },
    card: {
        backgroundColor: "#1e293b",
        borderRadius: 20,
        width: "100%",
        paddingVertical: 28,
        paddingHorizontal: 20,
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        alignItems: "center",
    },
    input: {
        backgroundColor: "#334155",
        color: "#fff",
        width: "100%",
        borderRadius: 14,
        padding: 14,
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#2563eb",
        paddingVertical: 12,
        borderRadius: 14,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    otpInput: {
        backgroundColor: "#334155",
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        borderRadius: 10,
        width: 45,
        height: 55,
    },
    otpActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 16,
    },
    resendText: {
        color: "#60a5fa",
        fontSize: 14,
        fontWeight: "500",
    },
    changeEmailText: {
        color: "#f87171",
        fontSize: 14,
        fontWeight: "500",
    },
    footer: {
        color: "#64748b",
        fontSize: 12,
        textAlign: "center",
        position: "absolute",
        bottom: 20,
        width: "100%",
    },
    link: {
        color: "#60a5fa",
    },
});
