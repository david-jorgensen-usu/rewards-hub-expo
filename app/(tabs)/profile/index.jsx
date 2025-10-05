import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const router = useRouter();

  // Helper function to navigate relative to the profile folder
  const navigate = (page) => router.push(page);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#f9b145", "#ffffff"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.heroContainer}
      />

      <View style={styles.userInfoContainer}>
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/men/10.jpg' }}
          style={styles.userImage}
        />
        <View style={styles.userTextInfoContainer}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>randomuserjohn25@gmail.com</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>14</Text>
          <Text style={styles.statLabel}>Programs</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>200</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>15</Text>
          <Text style={styles.statLabel}>Entries</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <OptionButton
          icon={<MaterialIcons name="feedback" size={20} color="black" />}
          title="Provide Feedback"
          subtitle="Help us improve the app"
          onPress={() => navigate('profile/feedback')}
        />

        <OptionButton
          icon={<MaterialIcons name="privacy-tip" size={20} color="black" />}
          title="Privacy Policy"
          subtitle="Learn about our privacy practices"
          onPress={() => navigate('profile/privacy')}
        />

        <OptionButton
          icon={<Entypo name="log-out" size={20} color="black" />}
          title="Log Out"
          subtitle="Sign out of your account"
          onPress={() => navigate('profile/logout')}
        />

        <OptionButton
          icon={<Feather name="edit" size={20} color="black" />}
          title="Edit Profile"
          subtitle="Update your personal information"
          onPress={() => navigate('profile/edit')}
        />

        <OptionButton
          icon={<MaterialIcons name="delete-forever" size={20} color="black" />}
          title="Delete Account"
          subtitle="Remove your account permanently"
          onPress={() => navigate('profile/delete')}
        />

        <OptionButton
          icon={<MaterialCommunityIcons name="restart" size={24} color="black" />}
          title="TESTING: Signup Page"
          subtitle="Visit the signup page"
          onPress={() => navigate('signup')}
        />

        <OptionButton
          icon={<MaterialCommunityIcons name="restart" size={24} color="black" />}
          title="TESTING: Signin Page"
          subtitle="Visit the signin page"
          onPress={() => navigate('signin')}
        />
      </ScrollView>
    </View>
  );
}

// Reusable button component
function OptionButton({ icon, title, subtitle, onPress }) {
  return (
    <View style={styles.userOptionsContainer}>
      <TouchableOpacity style={styles.userOptionTextButton} onPress={onPress}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={styles.userOptionTextContainer}>
          <Text style={styles.userOptionTitle}>{title}</Text>
          <Text style={styles.userOptionSubtitle}>{subtitle}</Text>
        </View>
      </TouchableOpacity>
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
    flexDirection: 'column',
    width: '100%',
    height: 100,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#ffeed3ff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    height: 25,
    textAlign: 'center',
  },
  userInfoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: -30,
    marginBottom: 20,
    width: '100%',
  },
  userTextInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    gap: 5,
    width: '100%',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    paddingVertical: 20,
    backgroundColor: '#ffeed3ff',
    borderRadius: 20,
    marginBottom: 20,
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
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
  },
  userOptionsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#ffeed3ff',
    marginBottom: 15,
  },
  userOptionTextButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
  },
  userOptionTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 50,
  },
  userOptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userOptionSubtitle: {
    fontSize: 12,
    color: '#666',
  },
});
