import React from 'react';
import { Linking } from 'react-native';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PrivacyPage() {
  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.subtitle}>
            Your privacy is important to us. This policy explains what data we collect and how we use it.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.sectionText}>
            We collect the following types of information:
          </Text>
          <Text style={styles.sectionText}>
            • User-provided info: email, username, first and last name, feedback, linked apps, notification preferences.
          </Text>
          <Text style={styles.sectionText}>
            • Automatically collected info: device information and app usage data to improve our services.
          </Text>
          <Text style={styles.sectionText}>
            • Security info: encrypted passwords and authentication tokens (JWT) used to log in securely.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.sectionText}>
            We use your information to provide and improve the RewardsHub experience, link apps, send alerts, respond to feedback, and ensure account security.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Data Sharing</Text>
          <Text style={styles.sectionText}>
            • We do not sell your personal information.{"\n"}
            • We only share your information with trusted service providers for app functionality.{"\n"}
            • Linked apps only receive the information necessary for notifications; no sensitive personal info is shared.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Data Security</Text>
          <Text style={styles.sectionText}>
            All sensitive data, including passwords and tokens, are securely encrypted. Authentication uses JWT tokens and all network communication is encrypted via SSL/TLS.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. User Rights</Text>
          <Text style={styles.sectionText}>
            You can request deletion of your account, opt out of notifications, or review the data we store. Contact us at rewardshubonline@gmail.com for assistance.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Cookies and Tracking</Text>
          <Text style={styles.sectionText}>
            We may use analytics to improve app performance, but no personally identifiable info is shared for advertising.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Changes to this Policy</Text>
          <Text style={styles.sectionText}>
            We may update this Privacy Policy occasionally. The latest version will always be available in the app.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Contact Us</Text>
          <Text style={styles.sectionText}>
            Email:{" "}
            <Text
              style={{ color: '#2255EB', textDecorationLine: 'underline' }}
              onPress={() => Linking.openURL('mailto:rewardshubonline@gmail.com')}
            >
              rewardshubonline@gmail.com
            </Text>
          </Text>
          <Text style={styles.sectionText}>
            Website:{" "}
            <Text
              style={{ color: '#2255EB', textDecorationLine: 'underline' }}
              onPress={() => Linking.openURL('https://rewardshub.online')}
            >
              https://rewardshub.online
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Bahnschrift-SemiBold',
    color: '#2255EB',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Segoe UI',
    fontWeight: '300',
    color: '#4A4A4A',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Bahnschrift-SemiBold',
    color: '#2255EB',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: 'Segoe UI',
    fontWeight: '300',
    color: '#4A4A4A',
    lineHeight: 20,
  },
});
