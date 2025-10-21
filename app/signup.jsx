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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      }),
    });

    const text = await response.text();
    console.log("📜 Raw response:", text); // see what Django returns

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
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Image
            source={require('@/assets/rewardsHubLogos/rewardshub.png')}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
          <Text style={styles.welcomeText}>Welcome, new friend!</Text>

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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // prevents gray bar
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  welcomeImage: {
    height: 300,
    width: 300,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#4e2a14',
  },
  inputContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  input: {
    width: 250,
    borderWidth: 1,
    borderColor: '#f9b145',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#4e2a14',
  },
  signUpButton: {
    backgroundColor: '#f9b145',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 250,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4e2a14',
  },
  createAccountButton: {
    marginTop: 10,
  },
  createAccountText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4e2a14',
    textAlign: 'center',
  },
});
