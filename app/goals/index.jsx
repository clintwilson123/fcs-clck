import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, LayoutAnimation, UIManager, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useGoals } from "../../hooks/useGoals";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function NotesList() {
  const router = useRouter();
  const { goals, updateGoal, deleteGoal } = useGoals();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/"); // go back to login
  };

  const startEdit = (note) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setEditingId(note.id);
    setEditText(note.goal);
  };

  const saveEdit = async (id) => {
    if (editText.trim()) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      await updateGoal(id, { goal: editText });
      setEditingId(null);
      setEditText("");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.noteItem}>
      {editingId === item.id ? (
        <>
          <TextInput
            style={styles.input}
            value={editText}
            onChangeText={setEditText}
            autoFocus
          />
          <View style={styles.actions}>
            <TouchableOpacity style={styles.saveBtn} onPress={() => saveEdit(item.id)}>
              <Ionicons name="checkmark" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setEditingId(null);
            }}>
              <Ionicons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.noteText}>{item.goal}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.editBtn} onPress={() => startEdit(item)}>
              <Ionicons name="create-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteGoal(item.id)}>
              <Ionicons name="trash-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          My <Text style={styles.highlight}>Notes List</Text>
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#e63946" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No notes yet. Create one!</Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/goals/create")}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f0f4f8"
  },
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    marginBottom: 20
  },
  title: { 
    fontSize: 30, 
    fontWeight: "bold", 
    color: "#333"
  },
  highlight: {
    color: "#1976d2"
  },
  noteItem: { 
    backgroundColor: "#fff", 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 15, 
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3
  },
  noteText: { 
    fontSize: 18, 
    color: "#333", 
    marginBottom: 12
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 12, 
    borderRadius: 10, 
    backgroundColor: "#fafafa", 
    marginBottom: 10, 
    fontSize: 16,
    color: "#333"
  },
  actions: { 
    flexDirection: "row", 
    justifyContent: "flex-end", 
    gap: 10
  },
  editBtn: { 
    backgroundColor: "#4caf50", 
    padding: 10, 
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  deleteBtn: { 
    backgroundColor: "#f44336", 
    padding: 10, 
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  saveBtn: { 
    backgroundColor: "#2196f3", 
    padding: 10, 
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  cancelBtn: { 
    backgroundColor: "#9e9e9e", 
    padding: 10, 
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  empty: { 
    textAlign: "center", 
    marginTop: 60, 
    fontSize: 18, 
    color: "#999" 
  },
  addButton: {
    backgroundColor: "#1976d2",
    padding: 16,
    borderRadius: 35,
    position: "absolute",
    bottom: 30,
    right: 30,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center"
  }
});
