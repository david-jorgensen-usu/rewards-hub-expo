import { View, Text, StyleSheet } from "react-native";

export default function LogOutPage() {
  return (
    <View style={styles.container}>
      <Text>Log Out</Text>
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
