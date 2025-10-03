import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";

export default function Profile() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#c1dcffff", "#ffffff"]} // gradient colors
                start={{ x: 0.5, y: 0 }} // top-left
                end={{ x: 0.5, y: 1 }}   // bottom-right
                style={styles.heroContainer}
            >
            </LinearGradient>
            <View style={styles.userInfoContainer}>
                <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/men/10.jpg' }}
                    style={styles.userImage}
                />
                <View style={styles.userTextInfoContainer}>
                    <Text 
                        style={styles.userName}
                    >John Doe</Text>
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
                style={{ flex: 1, backgroundColor: '#fff', width: '100%' }}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false} // hides scrollbar
            >
                <View style={styles.userOptionsContainer}>
                <TouchableOpacity style={styles.userOptionTextButton}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="feedback" size={20} color="black" />
                    </View>
                    <View style={styles.userOptionTextContainer}>
                        <Text style={styles.userOptionTitle}>Provide Feedback</Text>
                        <Text style={styles.userOptionSubtitle}>Help us improve the app</Text>
                    </View>
                </TouchableOpacity>   
                </View>
                <View style={styles.userOptionsContainer}>
                    <TouchableOpacity style={styles.userOptionTextButton}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="privacy-tip" size={20} color="black" />
                        </View>
                        <View style={styles.userOptionTextContainer}>
                            <Text style={styles.userOptionTitle}>Privacy Policy</Text>
                            <Text style={styles.userOptionSubtitle}>Learn about our privacy practices</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.userOptionsContainer}>
                    <TouchableOpacity style={styles.userOptionTextButton}>
                        <View style={styles.iconContainer}>
                            <Entypo name="log-out" size={20} color="black" />
                        </View>
                        <View style={styles.userOptionTextContainer}>
                            <Text style={styles.userOptionTitle}>Log Out</Text>
                            <Text style={styles.userOptionSubtitle}>Sign out of your account</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.userOptionsContainer}>
                    <TouchableOpacity style={styles.userOptionTextButton}>
                        <View style={styles.iconContainer}>
                            <Feather name="edit" size={20} color="black" />
                        </View>
                        <View style={styles.userOptionTextContainer}>
                            <Text style={styles.userOptionTitle}>Edit Profile</Text>
                            <Text style={styles.userOptionSubtitle}>Update your personal information</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.userOptionsContainer}>
                    <TouchableOpacity style={styles.userOptionTextButton}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="delete-forever" size={20} color="black" />
                        </View>
                        <View style={styles.userOptionTextContainer}>
                            <Text style={styles.userOptionTitle}>Delete Account</Text>
                            <Text style={styles.userOptionSubtitle}>Remove your account permanently</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
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
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#eef5ffff',
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
        backgroundColor: '#eef5ffff',
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
    userOptionsContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
        gap: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#eef5ffff',
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
    userOptionsBox: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        paddingBottom: 20,
    },
    scrollContent: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 20,
    },
});
