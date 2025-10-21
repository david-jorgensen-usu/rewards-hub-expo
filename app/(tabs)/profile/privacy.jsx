import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PrivacyPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Privacy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
