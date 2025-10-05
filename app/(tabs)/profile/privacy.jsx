import { View, Text, StyleSheet } from "react-native";

export default function PrivacyPage() {
  return (
    <View style={styles.container}>
      <Text>Privacy Settings</Text>
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
