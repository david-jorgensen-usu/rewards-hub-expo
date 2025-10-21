import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DeletePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Delete Account</Text>
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
