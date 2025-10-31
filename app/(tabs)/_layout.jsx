import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, 
      tabBarActiveTintColor: "#f9b145",
    }} >
      <Tabs.Screen 
        name="index" 
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
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size}) => (
            <Feather name="user" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="rewards/[company]"
        options={{
          href: null, // hides it from the tab bar
        }}
      />
      <Tabs.Screen
        name="profile/privacy"
        options={{
          href: null, // hides it from the tab bar
        }}
      />
      <Tabs.Screen
        name="profile/feedback"
        options={{
          href: null, // hides it from the tab bar
        }}
      />
      <Tabs.Screen
        name="profile/delete"
        options={{
          href: null, // hides it from the tab bar
        }}
      />
      <Tabs.Screen
        name="profile/test_location"
        options={{
          href: null, // hides it from the tab bar
        }}
      />
      <Tabs.Screen
        name="profile/test_notifications"
        options={{
          href: null, // hides it from the tab bar
        }}
      />
      <Tabs.Screen
        name="profile/logout"
        options={{
          href: null, // hides it from the tab bar
        }}
      />
    </Tabs>
  );
};