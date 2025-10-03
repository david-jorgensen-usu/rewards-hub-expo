import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CardGallery from "../components/global/CardGallery";
import CompanyCard from "../components/global/CompanyCard";

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
                <CompanyCard
                companyLogo="https://cdn.prod.website-files.com/659a9ef71c962485037fcc8f/65ed11b9d9252c7b9cd65ec1_Starbucks-logo.webp"
                points={300}
                />
                <CompanyCard
                companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMIWRFhAKXElD1Ks7U-5g3fqA77uuY9p4ydA&s"
                points={100}
                />
                <CompanyCard
                companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQod4Ol1LRsJ-huxBz8VLVKsnc4FfLmwjNKQA&s"
                points={10}
                />
                <CompanyCard
                companyLogo="https://www.allrecipes.com/thmb/s86K8lVB5uw18upmfu3Z2gADDzA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/allrecipes-panda-express-4x3-935b766703a145f4ab5792da94f0f3d0.jpg"
                points={30}
                />
                <CompanyCard
                companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTpdnCaNKupk2YSbUXA2tNGPGcNA3jTj2QyA&s"
                points={500}
                />
                <CompanyCard
                companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcEe4qZNWGZ9_w2u53w-qpkkTH1dDp3G7rHw&s"
                points={300}
                />
                <CompanyCard
                companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNFsqOKKk-INdD6cBxf8dGKqPeyILKk_qJgg&s"
                points={20}
                />
                <CompanyCard
                companyLogo="https://a.storyblok.com/f/242299/512x512/1bd930f4fe/placeholder.jpg/m/"
                points={20}
                />
                <CompanyCard
                companyLogo="https://theredledger.net/wp-content/uploads/2022/05/HcAaSiQHjWLLR1qNPq61oNbg0nJhbhS9NOy0nzzB.png"
                points={70}
                />
                <CompanyCard
                companyLogo="https://pbs.twimg.com/profile_images/1935756290506027008/MgvAA09k_400x400.png"
                points={40}
                />
                <CompanyCard
                companyLogo="https://chambermaster.blob.core.windows.net/images/members/2428/2119/MemLogo_Smiths.png"
                points={170}
                />
                <CompanyCard
                companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVEVgMwbQvcL4eBS5IGtDkBuvEImW8XvlKBtBh7s8kNfYbUT6yFdT6xGUFWVZuiJcbD2E&usqp=CAU"
                points={220}
                />
                <CompanyCard
                companyLogo="https://cdn.prod.website-files.com/659a9ef71c962485037fcc8f/65ed11b9d9252c7b9cd65ec1_Starbucks-logo.webp"
                points={300}
                />
                <CompanyCard
                companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMIWRFhAKXElD1Ks7U-5g3fqA77uuY9p4ydA&s"
                points={100}
                />
                <CompanyCard
                companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQod4Ol1LRsJ-huxBz8VLVKsnc4FfLmwjNKQA&s"
                points={10}
                />
                <CompanyCard
                companyLogo="https://www.allrecipes.com/thmb/s86K8lVB5uw18upmfu3Z2gADDzA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/allrecipes-panda-express-4x3-935b766703a145f4ab5792da94f0f3d0.jpg"
                points={30}
                />
                <CompanyCard
                companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTpdnCaNKupk2YSbUXA2tNGPGcNA3jTj2QyA&s"
                points={500}
                />
                <CompanyCard
                companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcEe4qZNWGZ9_w2u53w-qpkkTH1dDp3G7rHw&s"
                points={300}
                />
                <CompanyCard
                companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNFsqOKKk-INdD6cBxf8dGKqPeyILKk_qJgg&s"
                points={20}
                />
                <CompanyCard
                companyLogo="https://a.storyblok.com/f/242299/512x512/1bd930f4fe/placeholder.jpg/m/"
                points={20}
                />
                <CompanyCard
                companyLogo="https://theredledger.net/wp-content/uploads/2022/05/HcAaSiQHjWLLR1qNPq61oNbg0nJhbhS9NOy0nzzB.png"
                points={70}
                />
                <CompanyCard
                companyLogo="https://pbs.twimg.com/profile_images/1935756290506027008/MgvAA09k_400x400.png"
                points={40}
                />
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
