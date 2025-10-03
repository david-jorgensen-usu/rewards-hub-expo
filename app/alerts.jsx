import { StyleSheet, Text, View } from "react-native";

export default function Alerts() {
    return (
        <View style={styles.container}>
            <Text>Alerts</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});