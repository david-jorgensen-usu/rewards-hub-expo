import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SigninPage() {
  const router = useRouter();
  const navigate = (page) => router.push(page);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleSignIn = async () => {
    try {
      const response = await fetch('https://rewardshub.online/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();
      console.log('Sign in response:', data);

      if (response.ok && data.access) {
        await AsyncStorage.setItem('accessToken', data.access);
        await AsyncStorage.setItem('refreshToken', data.refresh);
        router.replace('/(tabs)');
      } else {
        alert(data.detail || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
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
          <Text style={styles.welcomeText}>Welcome back, friend!</Text>

          <View style={styles.inputContainer}>
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

            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createAccountButton}
              onPress={() => navigate('signup')}
            >
              <Text style={styles.createAccountText}>
                New here? Create an account
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
    backgroundColor: '#fff',
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
  signInButton: {
    backgroundColor: '#f9b145',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 250,
    alignItems: 'center',
  },
  signInText: {
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
