// app/goals/about.jsx
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>About Notes List</Text>

      <Text style={styles.sectionTitle}>App Overview</Text>
      <Text style={styles.sectionText}>
        Notes List is a simple and intuitive note-taking application designed
        to help users manage their daily tasks, ideas, and goals. Create,
        edit, and delete notes with ease while keeping your workflow organized.
      </Text>

      <Text style={styles.sectionTitle}>Developer</Text>
      <Text style={styles.sectionText}>
        Clint Wilson Gonzales {"\n"}
        BSIT-3B Mobile Development {"\n"}
        Passionate about creating intuitive and functional apps
        for everyday use.
      </Text>

      <Text style={styles.sectionTitle}>Features</Text>
      <Text style={styles.sectionText}>
        • Add, edit, and delete notes easily {"\n"}
        • User authentication with Firebase {"\n"}
        • Responsive and clean UI for better user experience {"\n"}
        • Simple navigation between notes and creation tabs
      </Text>

      <Text style={styles.sectionTitle}>Contact</Text>
      <Text style={styles.sectionText}>
        Email: clintwilson.gonzales24@gmail.com {"\n"}
        Feel free to reach out for feedback, collaboration, or suggestions.
      </Text>

      <Text style={styles.footer}>Thank you for using Notes List!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
    color: "#333",
  },
  sectionText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  footer: {
    fontSize: 16,
    color: "#1976d2",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
  },
});
