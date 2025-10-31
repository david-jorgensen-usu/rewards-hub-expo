import rewards from "@/data/companyData";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

const getCompanyKey = (name) => name.toLowerCase().replace(/\s+/g, "-");

export default function RewardsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRewards = rewards
    .filter((r) => (activeFilter === "all" ? true : r.category === activeFilter))
    .filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 🔹 Fixed Header */}
      <View style={styles.header}>
        {/* Search Bar */}
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

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {[
            { id: "all", label: "All", icon: "🎁" },
            { id: "food", label: "Food", icon: "🍔" },
            { id: "grocery", label: "Grocery", icon: "🛒" },
            { id: "gas", label: "Gas", icon: "⛽" },
            { id: "entertainment", label: "Entertainment", icon: "🎬" },
            { id: "shopping", label: "Shopping", icon: "🛍️" },
          ].map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setActiveFilter(filter.id)}
              style={[
                styles.filterButton,
                activeFilter === filter.id && styles.filterButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter.id && styles.filterTextActive,
                ]}
              >
                {filter.icon} {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 🔹 Scrollable Grid */}
      <FlatList
        data={filteredRewards}
        keyExtractor={(item, index) => `${item.reference}-${index}`}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "flex-start", gap: 10 }}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => {
          const imageSource = item.logoFile;
          if (!imageSource) return null;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.tile}
              onPress={() =>
                router.push({
                  pathname: `/rewards/${item.reference}`,
                  params: {
                    reference: item.reference,
                    name: item.name,
                    color: item.color,
                    category: item.category,
                    logoFile: item.logoFile,
                  },
                })
              }
            >
              <Image source={imageSource} style={styles.icon} resizeMode="cover" />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },

  // Header
  header: {
    backgroundColor: "#F3F4F6",
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 8,
    zIndex: 10,
  },
  searchContainer: { marginBottom: 12 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchIcon: { fontSize: 20, marginRight: 12, color: "#2255EB" },
  searchInput: { flex: 1, fontSize: 16, color: "#4A4A4A" },

  // Filters
  filterScroll: { marginBottom: 8 },
  filterButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterButtonActive: {
    backgroundColor: "#2255EB",
    borderColor: "#2255EB",
  },
  filterText: { fontSize: 14, fontWeight: "500", color: "#4A4A4A" },
  filterTextActive: { color: "#FFFFFF" },

  // Grid
  gridContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
    paddingTop: 10,
  },
  tile: {
    width: "22%",
    aspectRatio: 16 / 9,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  icon: { width: "100%", height: "100%", borderRadius: 10 },
});
