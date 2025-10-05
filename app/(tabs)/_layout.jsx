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
        name="rewards/index" 
        options={{ 
          title: "Rewards",
          tabBarLabel: "Rewards",
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
        name="profile/edit"
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
        name="profile/logout"
        options={{
          href: null, // hides it from the tab bar
        }}
      />
    </Tabs>
  );
};