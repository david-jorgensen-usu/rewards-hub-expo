import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home",
          tabBarIcon: ({ color, size}) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )
        }} 
      />
      <Tabs.Screen 
        name="rewards" 
        options={{ 
          title: "Rewards",
          tabBarIcon: ({ color, size}) => (
            <Ionicons name="gift-outline" size={size} color={color} />
          )
        }} 
      />
      <Tabs.Screen 
        name="alerts" 
        options={{ 
          title: "Alerts",
          tabBarIcon: ({ color, size}) => (
            <Feather name="bell" size={size} color={color} />
          )
        }} 
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size}) => (
            <Feather name="user" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  );
};