import CardGallery from "@/components/global/CardGallery";
import CompanyCard from "@/components/global/CompanyCard";
import HeroSection from "@/components/index/HeroSection";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <HeroSection 
        title="Hi John!"
        subtitle="You've earned 1,250 points so far."
        buttonText="Explore Rewards"
        onButtonPress={() => { 
          router.push('/rewards'); 
        }}
      />
      <Text style={styles.recentRewardsTitle}>Recent Entries</Text>
      <CardGallery>
        <CompanyCard
          companyName={"starbucks"}
          points={300}
        />
        
      </CardGallery>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  recentRewardsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});