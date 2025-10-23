import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function SignupPage() {
  const router = useRouter();
  const navigate = (page) => router.push(page);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch("https://rewardshub.online/registration/sign-up/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      });

      const text = await response.text();
      console.log("📜 Raw response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error("❌ JSON Parse Error:", parseErr);
        Alert.alert("Server Error", "Invalid response from server.");
        return;
      }

      if (response.ok) {
        Alert.alert("✅ Success", "Account created successfully!");
        console.log("User:", data);
        router.replace("/signin");
      } else {
        console.warn("⚠️ Signup failed:", data);
        Alert.alert("❌ Error", data.detail || data.error || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("⚠️ Network Error", "Could not connect to server.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo Square */}
        <View style={styles.logoSquare}>
          <Image
            source={require('@/assets/rewardsHubLogos/rewardshub.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Title & Subtitle */}
        <Text style={styles.title}>RewardsHub</Text>
        <Text style={styles.subtitle}>Create your account</Text>

        {/* Inputs */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#8c8c8c"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#8c8c8c"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#8c8c8c"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8c8c8c"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigate('signin')}
          >
            <Text style={styles.createAccountText}>
              Have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoSquare: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  title: {
    fontFamily: 'Bahnschrift-SemiBold',
    fontSize: 36, // approx 2x subtitle
    color: '#2255EB',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Segoe UI',
    fontWeight: '300', // light
    fontSize: 18,
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
    gap: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#2255EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#4A4A4A',
    backgroundColor: '#fff',
  },
  signUpButton: {
    backgroundColor: '#2255EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F3F4F6',
  },
  createAccountButton: {
    marginTop: 12,
  },
  createAccountText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4A4A4A',
    textAlign: 'center',
  },
});
