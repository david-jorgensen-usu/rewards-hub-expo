import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function CompanyCard({ companyName, companyLogo, points }) {
    return (
        <View style={styles.card}>
            <ImageBackground source={{ uri: companyLogo }} style={styles.imageBackground}></ImageBackground>
            <View style={styles.infoContainer}>
                <Text style={styles.points}>+{points} Points</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '30%',
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 3,
    },
    imageBackground: {
       backgroundColor: 'black',
       width: '100%',
       height: 60,
       overflow: 'hidden',
       justifyContent: 'center',
       alignItems: 'center',
    },
    infoContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#eeeeeeff',
        padding: 10,
    },
    points: {
        fontStyle: 'italic',
        fontSize: 14,
    },
});