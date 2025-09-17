// context/GoalsProvider.js
import { createContext, useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // make sure path is correct

export const GoalsContext = createContext();

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState([]);

  // Fetch goals from Firebase when the provider mounts
  useEffect(() => {
    fetchGoals();
  }, []);

  // Fetch all goals
  async function fetchGoals() {
    try {
      const snapshot = await getDocs(collection(db, 'goals'));
      const fetchedGoals = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGoals(fetchedGoals);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  }

  // Create a new goal
  async function createGoal(goalData) {
    try {
      const docRef = await addDoc(collection(db, "goals"), goalData);
      setGoals(prev => [...prev, { id: docRef.id, ...goalData }]);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  }

  // Update a goal
  async function updateGoal(id, updatedFields) {
    try {
      const goalRef = doc(db, "goals", id);
      await updateDoc(goalRef, updatedFields);
      setGoals(prev =>
        prev.map(goal => (goal.id === id ? { ...goal, ...updatedFields } : goal))
      );
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  }

  // Delete a goal
  async function deleteGoal(id) {
    try {
      const goalRef = doc(db, "goals", id);
      await deleteDoc(goalRef);
      setGoals(prev => prev.filter(goal => goal.id !== id));
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  }

  return (
    <GoalsContext.Provider value={{ goals, fetchGoals, createGoal, updateGoal, deleteGoal }}>
      {children}
    </GoalsContext.Provider>
  );
}
