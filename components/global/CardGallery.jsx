import { StyleSheet, Text, View } from "react-native";

export default function CardGallery({ galleryTitle, children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.cardGalleryTitle}>{galleryTitle}</Text>
            <View style={styles.cardGallery}>
                {children}
            </View>
        </View>
    );
}        

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    cardGallery: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        gap: 5,
        flexWrap: 'wrap',
    },
    cardGalleryTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        alignSelf: 'flex-start',
        paddingLeft: 20,
    },
});