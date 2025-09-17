import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Temporary auth state (replace with real auth later)
const isLoggedIn = false;

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* If user is logged in, show goals */}
        {isLoggedIn ? (
          <Stack.Screen name="goals" />  
        ) : (
          <>
            <Stack.Screen name="index" />   
            <Stack.Screen name="signup" />  
          </>
        )}
      </Stack>
    </>
  );
}
