import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GoalsProvider } from "../../contexts/GoalsProvider";
import { View, StyleSheet } from "react-native";

export default function GoalsLayout() {
  return (
    <GoalsProvider>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1976d2",
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 5,
            elevation: 4,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 22,
          },
          tabBarActiveTintColor: "#1976d2",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 65,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: -2 },
            shadowRadius: 5,
            elevation: 5,
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarItemStyle: {
            marginHorizontal: 10,
            borderRadius: 10,
            paddingVertical: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Your Notes",
            tabBarIcon: ({ color, size }) => (
              <View style={styles.iconWrapper}>
                <Ionicons name="book" size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create Note",
            tabBarIcon: ({ color, size }) => (
              <View style={styles.iconWrapper}>
                <Ionicons name="create" size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            tabBarIcon: ({ color, size }) => (
              <View style={styles.iconWrapper}>
                <Ionicons name="information-circle" size={size} color={color} />
              </View>
            ),
          }}
        />
      </Tabs>
    </GoalsProvider>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
