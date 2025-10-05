import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SignupPage() {
  const router = useRouter();
  const navigate = (page) => router.push(page);
  
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/rewardsHubLogos/rewardshub.png')}
        style={styles.welcomeImage}
        resizeMode='contain'
      />
      <Text style={styles.welcomeText}>Welcome, new friend!</Text>
      <View style={styles.oauthContainer}>
        <TouchableOpacity style={styles.oauthButton}>
          <Image source={require('@/assets/oauthLogos/google.png')} style={styles.oauthIcon} />
          <Text style={styles.oauthText}>Sign up with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.oauthButton}>
          <Image source={require('@/assets/oauthLogos/apple.png')} style={styles.oauthIcon} />
          <Text style={styles.oauthText}>Sign up with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.createAccountButton}
          onPress={() => {
            navigate('signin');
          }}
        >
          <Text style={styles.createAccountText}>Have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: '#4e2a14',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    welcomeImage: {
        height: 300,
        width: 300,
    },
    oauthContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        gap: 10,
        marginTop: 20,
    },
    oauthButton: {
        padding: 10,
        backgroundColor: '#eef5ffff',
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        backgroundColor: '#f9b145',
    },
    oauthIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    oauthText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#4e2a14',
    },
    createAccountText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4e2a14',
        textAlign: 'center',
    },
});