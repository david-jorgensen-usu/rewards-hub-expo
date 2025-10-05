import CardGallery from "@/components/global/CardGallery";
import CompanyCard from "@/components/global/CompanyCard";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Rewards() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#c1dcffff", "#ffffff"]} // gradient colors
                start={{ x: 0.5, y: 0 }} // top-left
                end={{ x: 0.5, y: 1 }}   // bottom-right
                style={styles.heroContainer}
            >
                <Text style={styles.rewardsTitle}>Rewards Programs</Text>
                <View style={styles.filterChipsContainer}>
                    <TouchableOpacity style={styles.filterChip}>
                        <Text style={styles.filterChipText}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterChip}>
                        <Text style={styles.filterChipText}>Active</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterChip}>
                        <Text style={styles.filterChipText}>Points </Text>
                        <AntDesign name="caret-up" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterChip}>
                        <Text style={styles.filterChipText}><FontAwesome name="search" size={16} color="#fff" /></Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            
            <CardGallery>
                <CompanyCard companyName={"arbys"} points={300} />
                <CompanyCard companyName={"burger-king"} points={450} />
                <CompanyCard companyName={"cafe-rio"} points={200} />
                <CompanyCard companyName={"chevron"} points={150} />
                <CompanyCard companyName={"chick-fil-a"} points={500} />
                <CompanyCard companyName={"costa-vida"} points={350} />
                <CompanyCard companyName={"culvers"} points={400} />
                <CompanyCard companyName={"del-taco"} points={250} />
                <CompanyCard companyName={"fiiz"} points={100} />
                <CompanyCard companyName={"harmons"} points={600} />
                <CompanyCard companyName={"in-n-out"} points={700} />
                <CompanyCard companyName={"jack-in-the-box"} points={300} />
                <CompanyCard companyName={"kfc"} points={450} />
                <CompanyCard companyName={"lees"} points={200} />
                <CompanyCard companyName={"little-caesars"} points={150} />
                <CompanyCard companyName={"maverik"} points={500} />
                <CompanyCard companyName={"mcdonalds"} points={350} />
                <CompanyCard companyName={"megaplex"} points={400} />
                <CompanyCard companyName={"panda"} points={250} />
                <CompanyCard companyName={"seven-eleven"} points={100} />
                <CompanyCard companyName={"shein"} points={600} />
                <CompanyCard companyName={"shell"} points={700} />
                <CompanyCard companyName={"smiths"} points={300} />
                <CompanyCard companyName={"sodalicious"} points={450} />
                <CompanyCard companyName={"starbucks"} points={200} />
                <CompanyCard companyName={"subway"} points={150} />
                <CompanyCard companyName={"swig"} points={500} />
                <CompanyCard companyName={"taco-bell"} points={350} />
                <CompanyCard companyName={"target"} points={400} />
                <CompanyCard companyName={"walmart"} points={250} />
                <CompanyCard companyName={"wendys"} points={100} />
                <CompanyCard companyName={"zupas"} points={600} />
            </CardGallery>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
    },
    rewardsTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    heroContainer: {
        flexDirection: 'column',
        width: '100%',
        height: 150,
        paddingTop: 50,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        gap: 10,
    },
    filterChipsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    filterChip: {
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 10,
        backgroundColor: '#007bff',
        height: 36,
        flexDirection: 'row',
    },
    filterChipText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});
