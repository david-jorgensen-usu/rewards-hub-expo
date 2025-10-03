import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function CardGallery({ galleryTitle, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.cardGalleryTitle}>{galleryTitle}</Text>
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
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    flexWrap: "wrap",
  },
  cardGalleryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
});
