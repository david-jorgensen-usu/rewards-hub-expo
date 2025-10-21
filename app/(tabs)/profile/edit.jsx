import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EditPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Profile</Text>
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
