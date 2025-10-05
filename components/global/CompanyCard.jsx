import { useRouter } from "expo-router";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CompanyCard({ companyName, points }) {
    const router = useRouter();

    const companyImages = {
        "arbys" : require("@/assets/companyIcons/16x9/arbys-16x9.webp"),
        "burger-king" : require("@/assets/companyIcons/16x9/burger-king-16x9.webp"),
        "cafe-rio" : require("@/assets/companyIcons/16x9/cafe-rio-16x9.webp"),
        "chevron" : require("@/assets/companyIcons/16x9/chevron-16x9.webp"),
        "chick-fil-a" : require("@/assets/companyIcons/16x9/chick-fil-a-16x9.webp"),
        "costa-vida" : require("@/assets/companyIcons/16x9/costa-vida-16x9.webp"),
        "culvers" : require("@/assets/companyIcons/16x9/culvers-16x9.webp"),
        "del-taco" : require("@/assets/companyIcons/16x9/del-taco-16x9.webp"),
        "fiiz" : require("@/assets/companyIcons/16x9/fiiz-16x9.webp"),
        "harmons" : require("@/assets/companyIcons/16x9/harmons-16x9.webp"),
        "in-n-out" : require("@/assets/companyIcons/16x9/in-n-out-16x9.webp"),
        "jack-in-the-box" : require("@/assets/companyIcons/16x9/jack-in-the-box-16x9.webp"),
        "kfc" : require("@/assets/companyIcons/16x9/kfc-16x9.webp"),
        "lees" : require("@/assets/companyIcons/16x9/lees-16x9.webp"),
        "little-caesars" : require("@/assets/companyIcons/16x9/little-caesars-16x9.webp"),
        "maverik" : require("@/assets/companyIcons/16x9/maverik-16x9.webp"),
        "mcdonalds" : require("@/assets/companyIcons/16x9/mcdonalds-16x9.webp"),
        "megaplex" : require("@/assets/companyIcons/16x9/megaplex-16x9.webp"),
        "panda" : require("@/assets/companyIcons/16x9/panda-16x9.webp"),
        "seven-eleven" : require("@/assets/companyIcons/16x9/seven-eleven-16x9.webp"),
        "shein" : require("@/assets/companyIcons/16x9/shein-16x9.webp"),
        "shell" : require("@/assets/companyIcons/16x9/shell-16x9.webp"),
        "smiths" : require("@/assets/companyIcons/16x9/smiths-16x9.webp"),
        "sodalicious" : require("@/assets/companyIcons/16x9/sodalicious-16x9.webp"),
        "starbucks" : require("@/assets/companyIcons/16x9/starbucks-16x9.webp"),
        "subway" : require("@/assets/companyIcons/16x9/subway-16x9.webp"),
        "swig" : require("@/assets/companyIcons/16x9/swig-16x9.webp"),
        "taco-bell" : require("@/assets/companyIcons/16x9/taco-bell-16x9.webp"),
        "target" : require("@/assets/companyIcons/16x9/target-16x9.webp"),
        "walmart" : require("@/assets/companyIcons/16x9/walmart-16x9.webp"),
        "wendys" : require("@/assets/companyIcons/16x9/wendys-16x9.webp"),
        "zupas" : require("@/assets/companyIcons/16x9/zupas-16x9.webp"),
    };

    return (
        <TouchableOpacity style={styles.card} onPress={() => router.push(`/rewards/${encodeURIComponent(companyName)}`)}>
            <ImageBackground source={companyImages[companyName]} style={styles.imageBackground}></ImageBackground>
            <View style={styles.infoContainer}>
                <Text style={styles.points}>{points} Points</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '31%',
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
        backgroundColor: '#eef5ffff',
        padding: 10,
    },
    points: {
        fontStyle: 'italic',
        fontSize: 14,
        color: '#7c7c7cff',
    },
});