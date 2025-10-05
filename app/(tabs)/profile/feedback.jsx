import { View, Text, StyleSheet } from "react-native";

export default function FeedbackPage() {
  return (
    <View style={styles.container}>
      <Text>Feedback</Text>
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
