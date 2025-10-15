import { View, Text, StyleSheet, Button, Alert } from "react-native";

export default function FeedbackPage() {
  const fetchMessage = async () => {
    try {
      const response = await fetch("https://rewardshub.online/test-api/");
      const data = await response.json();
      Alert.alert("Message from server", data.message);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Feedback</Text>
      <Button title="Test Server Connection" onPress={fetchMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
