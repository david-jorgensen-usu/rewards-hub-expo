import rewards from "@/data/companyData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CATEGORY_FILTERS = [
  { id: "all", label: "All", icon: "🎁" },
  { id: "food", label: "Food", icon: "🍔" },
  { id: "grocery", label: "Grocery", icon: "🛒" },
  { id: "gas", label: "Gas", icon: "⛽" },
  { id: "entertainment", label: "Entertainment", icon: "🎬" },
  { id: "shopping", label: "Shopping", icon: "🛍️" },
];

export default function RewardsPage() {
  const router = useRouter();
  const [apps, setApps] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortStatus, setSortStatus] = useState("all"); // all / active / inactive

  const loadApps = async () => {
    try {
      const stored = await AsyncStorage.getItem("linkedApps");
      const linkedApps = stored ? JSON.parse(stored) : [];

      const mergedApps = rewards.map((app) => ({
        ...app,
        active: linkedApps.some((linked) => linked.reference === app.reference),
      }));

      setApps(mergedApps);

      const anyActive = mergedApps.some((app) => app.active);
      setSortStatus(anyActive ? "active" : "all");
    } catch (err) {
      console.error("Error loading apps:", err);
    }
  };

  // Call on component mount
  useEffect(() => {
    loadApps();
  }, []);

  // Call whenever the page gains focus
  useFocusEffect(
    useCallback(() => {
      loadApps();
    }, [])
  );


  // Apply filters, search, and sort
  const filteredApps = apps
    .filter((app) => (activeCategory === "all" ? true : app.category === activeCategory))
    .filter((app) => {
      if (sortStatus === "all") return true;
      if (sortStatus === "active") return app.active === true;
      if (sortStatus === "inactive") return app.active === false;
      return true;
    })
    .filter((app) => app.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Search + Category Filters */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search rewards..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {CATEGORY_FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setActiveCategory(filter.id)}
              style={[styles.filterButton, activeCategory === filter.id && styles.filterButtonActive]}
            >
              <Text style={[styles.filterText, activeCategory === filter.id && styles.filterTextActive]}>
                {filter.icon} {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Status Sort */}
        <View style={styles.sortContainer}>
          {["all", "active", "inactive"].map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => setSortStatus(status)}
              style={[styles.sortButton, sortStatus === status && styles.sortButtonActive]}
            >
              <Text style={[styles.sortText, sortStatus === status && styles.sortTextActive]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Grid */}
      <FlatList
        data={filteredApps}
        keyExtractor={(item) => item.reference}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "flex-start", gap: 10 }}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => {
          if (!item.logoFile) return null;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.tile, !item.active && { opacity: 0.5 }]}
              onPress={() =>
                router.push({
                  pathname: `/rewards/${item.reference}`,
                  params: { ...item },
                })
              }
            >
              <Image source={item.logoFile} style={styles.icon} resizeMode="cover" />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: { backgroundColor: "#F3F4F6", paddingTop: 60, paddingHorizontal: 24, paddingBottom: 8, zIndex: 10 },
  searchContainer: { marginBottom: 12 },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: "#E5E7EB" },
  searchIcon: { fontSize: 20, marginRight: 12, color: "#2255EB" },
  searchInput: { flex: 1, fontSize: 16, color: "#4A4A4A" },
  filterScroll: { marginBottom: 8 },
  filterButton: { backgroundColor: "#FFFFFF", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, marginRight: 8, borderWidth: 1, borderColor: "#E5E7EB" },
  filterButtonActive: { backgroundColor: "#2255EB", borderColor: "#2255EB" },
  filterText: { fontSize: 14, fontWeight: "500", color: "#4A4A4A" },
  filterTextActive: { color: "#FFFFFF" },
  sortContainer: { flexDirection: "row", marginBottom: 12, gap: 8 },
  sortButton: { backgroundColor: "#FFFFFF", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: "#E5E7EB" },
  sortButtonActive: { backgroundColor: "#2255EB", borderColor: "#2255EB" },
  sortText: { fontSize: 14, color: "#4A4A4A", fontWeight: "500" },
  sortTextActive: { color: "#FFFFFF" },
  gridContainer: { paddingHorizontal: 24, paddingBottom: 100, paddingTop: 10 },
  tile: { width: "22%", aspectRatio: 16 / 9, backgroundColor: "#FFFFFF", borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 20, overflow: "hidden", borderWidth: 1, borderColor: "#E5E7EB" },
  icon: { width: "100%", height: "100%", borderRadius: 10 },
});
