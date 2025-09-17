import { useState } from "react";
import { SafeAreaView, Text, TextInput, Pressable, Keyboard, StyleSheet, View } from "react-native";
import { useGoals } from "../../contexts/GoalsProvider";
import { useRouter } from "expo-router";

export default function Create() {
  const [note, setNote] = useState("");
  const { createGoal } = useGoals();
  const router = useRouter();

  const MAX_LENGTH = 200; // Max characters for note

  const handleSubmit = async () => {
    if (note.trim()) {
      await createGoal({
        goal: note,
        progress: 0,
      });
      setNote("");
      Keyboard.dismiss();
      router.push("/goals"); // redirect after saving
    }
  };

  const progress = Math.min(note.length / MAX_LENGTH, 1); // value between 0-1

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>➕ Create New Note</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Write your note..."
          placeholderTextColor="#999"
          value={note}
          onChangeText={setNote}
          multiline
          maxLength={MAX_LENGTH}
        />
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.charCount}>{note.length}/{MAX_LENGTH}</Text>
      </View>

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Note</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 25, 
    backgroundColor: "#f0f2f5" 
  },
  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    marginBottom: 40, 
    color: "#1976d2" 
  },
  inputWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 30,
  },
  input: { 
    width: "100%", 
    padding: 15, 
    fontSize: 16, 
    borderRadius: 12, 
    backgroundColor: "#fff", 
    textAlignVertical: "top",
    minHeight: 120,
  },
  progressBarContainer: {
    height: 6,
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 3,
    marginTop: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#1976d2",
  },
  charCount: {
    textAlign: "right",
    marginTop: 5,
    fontSize: 12,
    color: "#999",
  },
  button: { 
    width: "100%", 
    padding: 18, 
    borderRadius: 12, 
    alignItems: "center", 
    backgroundColor: "#1976d2",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "700", 
    fontSize: 18 
  },
});
