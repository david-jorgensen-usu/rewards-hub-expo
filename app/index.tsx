import React from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileInitials}>JD</Text>
        </View>
        <Text style={styles.headerTitle}>My Rewards</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          <ImageBackground
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6NE3aZizkVzc3aC_3pc_Z4hbcyioOX3DvDg&s",
            }}
            style={styles.cardBackground}
            resizeMode="cover"
          />
        </View>
        <View style={styles.card}>
          <ImageBackground
            source={{
              uri: "https://eu-images.contentstack.com/v3/assets/blt58a1f8f560a1ab0e/blt24cd9acf50473f4c/671be76580eaf57d221bec23/7_eleven_inc_logo_1800-945.jpg?width=1280&auto=webp&quality=80&disable=upscale",
            }}
            style={styles.cardBackground}
            resizeMode="cover"
          />
        </View>
        <View style={styles.card}>
          <ImageBackground
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH7exCo5qyRiwg4g3zOCT0jholwceMjDLgBg&s",
            }}
            style={styles.cardBackground}
            resizeMode="cover"
          />
        </View>
        <View style={styles.card}>
          <ImageBackground
            source={{
              uri: "https://cdn.mos.cms.futurecdn.net/5StAbRHLA4ZdyzQZVivm2c.jpg",
            }}
            style={styles.cardBackground}
            resizeMode="cover"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: { color: "#fff", fontWeight: "bold" },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 12 },
  content: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "flex-start",
    gap: 20,
  },
  card: {
    width: "45%",
    height: 70,
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardBackground: {
    flex: 1,
  },
});
