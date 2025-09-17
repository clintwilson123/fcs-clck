// app/contexts/GoalsProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const GoalsContext = createContext();

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState([]);

  // Fetch goals in real-time
  useEffect(() => {
    const q = query(collection(db, "goals"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const goalsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGoals(goalsData);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  // Create a new goal
  const createGoal = async (goalData) => {
    try {
      await addDoc(collection(db, "goals"), goalData);
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  // Update a goal
  const updateGoal = async (id, updatedFields) => {
    try {
      const goalRef = doc(db, "goals", id);
      await updateDoc(goalRef, updatedFields);
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  // Delete a goal
  const deleteGoal = async (id) => {
    try {
      const goalRef = doc(db, "goals", id);
      await deleteDoc(goalRef);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <GoalsContext.Provider
      value={{ goals, createGoal, updateGoal, deleteGoal }}
    >
      {children}
    </GoalsContext.Provider>
  );
}

// Hook for easy usage
export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context)
    throw new Error("useGoals must be used within a GoalsProvider");
  return context;
};
