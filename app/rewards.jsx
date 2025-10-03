import { StyleSheet, Text, View } from "react-native";
import CardGallery from "../components/global/CardGallery";
import CompanyCard from "../components/global/CompanyCard";

export default function Rewards() {
    return (
        <View style={styles.container}>
            <CardGallery galleryTitle="Available Rewards">
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
            </CardGallery>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 50,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
