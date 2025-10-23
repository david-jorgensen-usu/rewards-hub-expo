import { rewards } from '@/data/rewardsData';

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RewardsProgram() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('points');
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  const filteredRewards = rewards
    .filter(r => {
      if (activeFilter === 'all') return true;
      return r.category === activeFilter;
    })
    .filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => sortBy === 'points' ? b.points - a.points : a.name.localeCompare(b.name));


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
        {/* Header Container */}
        <View style={styles.headerContainer}>
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
          <View style={styles.filtersContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {[
                { id: 'all', label: 'All', icon: '🎁' },
                { id: 'food', label: 'Food', icon: '🍔' },
                { id: 'grocery', label: 'Grocery', icon: '🛒' },
                { id: 'gas', label: 'Gas', icon: '⛽' },
                { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
                { id: 'shopping', label: 'Shopping', icon: '🛍️' },
              ].map(filter => (
                <TouchableOpacity
                  key={filter.id}
                  onPress={() => setActiveFilter(filter.id)}
                  style={[
                    styles.filterButton,
                    activeFilter === filter.id && styles.filterButtonActive
                  ]}
                >
                  <Text style={[
                    styles.filterText,
                    activeFilter === filter.id && styles.filterTextActive
                  ]}>
                    {filter.icon} {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Sort */}
            <View style={styles.sortContainer}>
              <Text style={styles.sortLabel}>Sort by:</Text>
              <TouchableOpacity
                onPress={() => setSortBy('points')}
                style={[styles.sortButton, sortBy === 'points' && styles.sortButtonActive]}
              >
                <Text style={[styles.sortText, sortBy === 'points' && styles.sortTextActive]}>
                  Points
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSortBy('name')}
                style={[styles.sortButton, sortBy === 'name' && styles.sortButtonActive]}
              >
                <Text style={[styles.sortText, sortBy === 'name' && styles.sortTextActive]}>
                  Name
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Rewards Grid */}
        <View style={styles.rewardsGrid}>
          {filteredRewards.map((reward, idx) => (
            <TouchableOpacity 
              key={idx} 
              style={styles.rewardCard}
              onPress={() => router.push(`/rewards/${reward.reference}`)}
            >
              <ImageBackground
                source={reward.logoFile}
                style={styles.rewardLogo}
              >
                <View style={styles.giftBadge}>
                  <Text style={styles.giftIcon}>🔔</Text>
                </View>
              </ImageBackground>
              <View style={styles.rewardContent}>
                <Text style={styles.rewardName} numberOfLines={1}>
                  {reward.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F3F4F6',
    zIndex: 10,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginTop: 40,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
    color: '#2255EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#4A4A4A',
  },
  filtersContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  filterScroll: {
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#2255EB',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A4A4A',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    color: '#4A4A4A',
    marginRight: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  sortButtonActive: {
    backgroundColor: '#2255EB',
  },
  sortText: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  sortTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  rewardsGrid: {
    paddingHorizontal: 24,
    paddingBottom: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 230,
  },
  rewardCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  rewardLogo: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  giftBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 4,
  },
  giftIcon: {
    fontSize: 16,
    color: '#2255EB',
  },
  rewardContent: {
    padding: 16,
  },
  rewardName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2255EB',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#4A4A4A',
    fontWeight: '500',
  },
  redeemText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 12,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4A4A4A',
  },
  navLabelActive: {
    color: '#2255EB',
  },
});
