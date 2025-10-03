import { ScrollView, StyleSheet, View } from "react-native";

export default function CardGallery({ galleryTitle, children }) {
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardGallery} // layout of children
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flex: 1, // ensures ScrollView can take available space
  },
  cardGallery: {
    flexDirection: "row",   // stack children vertically
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
    flexWrap: "wrap",
    paddingHorizontal: 12,
  },
});
