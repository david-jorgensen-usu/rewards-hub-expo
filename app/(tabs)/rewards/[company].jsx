import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

// Hex colors for each company
const companyColors = {
  "arbys" : "#d71921",
  "burger-king" : "#ffae15",
  "cafe-rio" : "#f93a27",
  "chevron" : "#0357a1",
  "chick-fil-a" : "#e61636",
  "costa-vida" : "#2ab0a7",
  "culvers" : "#015697",
  "del-taco" : "#c03731",
  "fiiz" : "#50bcf1",
  "harmons" : "#d34726",
  "in-n-out" : "#e80018",
  "jack-in-the-box" : "#b50a37",
  "kfc" : "#c2122f",
  "lees" : "#1d4322",
  "little-caesars" : "#f88421",
  "maverik" : "#cf202f",
  "mcdonalds" : "#ffcb00",
  "megaplex" : "#632b8c",
  "panda" : "#c91d21",
  "seven-eleven" : "#015b40",
  "shein" : "#000000",
  "shell" : "#ffce10",
  "smiths" : "#d61b47",
  "sodalicious" : "#e3002b",
  "starbucks" : "#007042",
  "subway" : "#008939",
  "swig" : "#ff1d45",
  "taco-bell" : "#672c89",
  "target" : "#ff2929",
  "walmart" : "#007cc2",
  "wendys" : "#ff0435",
  "zupas" : "#0956a8",
};

const companyNames = {
  "arbys" : "Arby's",
  "burger-king" : "Burger King",
  "cafe-rio" : "Café Rio",
  "chevron" : "Chevron",
  "chick-fil-a" : "Chick-Fil-A",
  "costa-vida" : "Costa Vida",
  "culvers" : "Culver's",
  "del-taco" : "Del Taco",
  "fiiz" : "Fiiz Drinks",
  "harmons" : "Harmon's",
  "in-n-out" : "In-N-Out",
  "jack-in-the-box" : "Jack in the Box",
  "kfc" : "KFC",
  "lees" : "Lee's Marketplace",
  "little-caesars" : "Little Caesars",
  "maverik" : "Maverik",
  "mcdonalds" : "McDonald's",
  "megaplex" : "Megaplex",
  "panda" : "Panda Express",
  "seven-eleven" : "7-Eleven",
  "shein" : "Shein",
  "shell" : "Shell",
  "smiths" : "Smith's",
  "sodalicious" : "Sodalicious",
  "starbucks" : "Starbucks",
  "subway" : "Subway",
  "swig" : "Swig",
  "taco-bell" : "Taco Bell",
  "target" : "Target",
  "walmart" : "Walmart",
  "wendys" : "Wendy's",
  "zupas" : "Café Zupas",
};

export default function CompanyPage() {
  const { company } = useLocalSearchParams(); // get the company name from URL

  return (
    <View style={[styles.container]}>
      <View style={[styles.topDesignBar, { backgroundColor: companyColors[company] || "#ffffff" }]}>
      </View>
      <View style={styles.heroContainer}>
        <Text style={[styles.heroTitle, { color: companyColors[company] || "#000000" }]}>{companyNames[company].toUpperCase()}</Text>
        <View style={styles.statsContainerBox}>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
                <Text style={styles.statNumber}>100</Text>
                <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>
          <View style={[styles.statsContainer, { backgroundColor: '#6bc631' }]}>
            <View style={styles.statBox}>
                <Feather style={styles.statBoxIcon} name="bell" size={24} color="white" />
                <Text style={[styles.statLabel, { color: 'white' }]}>Active</Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.recentRewardsTitle}>Recent Entries</Text>
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
  heroContainer: {
    marginTop: 10,
    width: '100%',
    padding: 20,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  statsContainerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '47%',
    paddingVertical: 20,
    backgroundColor: '#eef5ffff',
    borderRadius: 20,
    alignSelf: 'center',
  },
  statBox: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
  },
  statNumber: {
      fontSize: 20,
      fontWeight: 'bold',
  },
  statLabel: {
      fontSize: 14,
      color: '#666',
  },
  topDesignBar: {
    top: 0,
    width: '100%',
    height: 30,
  },
  recentRewardsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: 20,
    marginBottom: 10,
  },
});
