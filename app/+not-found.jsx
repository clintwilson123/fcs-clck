import { View, Text, StyleSheet } from "react-native";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 - Page Not Found</Text>
      <Text style={styles.message}>This page does not exist.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#555",
  },
});
