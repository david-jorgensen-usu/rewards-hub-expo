import { View, Text, StyleSheet } from "react-native";

export default function DeleteAccountPage() {
  return (
    <View style={styles.container}>
      <Text>Delete Account</Text>
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
