import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default function HeroSection({ title, subtitle, buttonText, onButtonPress }) {
  return (
    <LinearGradient
        colors={["#f9b145", "#ffffff"]} // gradient colors
        start={{ x: 0.5, y: 0 }} // top-left
        end={{ x: 0.5, y: 1 }}   // bottom-right
        style={styles.container}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#f1f1f1ff',
    width: '100%',
    gap: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'left',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f9b145',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});