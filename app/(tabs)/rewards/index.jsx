import { rewards } from '@/data/rewardsData';
import { LinearGradient } from 'expo-linear-gradient';
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

  const totalPoints = rewards.reduce((sum, r) => sum + r.points, 0);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#F97316', '#F59E0B']}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Rewards</Text>
          </View>

          {/* Stats Card */}
          <View style={styles.statsCard}> 
            <View style={styles.statsHeader}>
              <Text style={styles.statsLabel}>Available Points</Text>
              <Text style={styles.sparkle}>✨</Text>
            </View>
            <Text style={styles.statsPoints}>{totalPoints.toLocaleString()}</Text>
            <View style={styles.statsFooter}>
              <Text style={styles.trendingIcon}>📈</Text>
              <Text style={styles.statsActive}>15 active programs</Text>
            </View>
          </View>
        </LinearGradient>

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
                <View style={styles.rewardPoints}>
                  <Text style={styles.pointsValue}>{reward.points}</Text>
                  <Text style={styles.pointsLabel}>pts</Text>
                </View>
                <View 
                  style={styles.redeemButton}
                >
                  <LinearGradient
                    colors={['#F97316', '#F59E0B']}
                    style={styles.redeemGradient}
                  >
                    <Text style={styles.redeemText}>Redeem</Text>
                  </LinearGradient>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF3C7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  sparkle: {
    fontSize: 20,
  },
  statsPoints: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  statsActive: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginTop: -16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
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
    backgroundColor: '#F97316',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
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
    color: '#6B7280',
    marginRight: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  sortButtonActive: {
    backgroundColor: '#FED7AA',
  },
  sortText: {
    fontSize: 14,
    color: '#6B7280',
  },
  sortTextActive: {
    color: '#C2410C',
    fontWeight: '500',
  },
  rewardsGrid: {
    paddingHorizontal: 24,
    paddingBottom: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rewardCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
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
  },
  rewardEmoji: {
    fontSize: 56,
  },
  rewardContent: {
    padding: 16,
  },
  rewardName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  rewardPoints: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F97316',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  redeemButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  redeemGradient: {
    paddingVertical: 8,
    alignItems: 'center',
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
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  navLabelActive: {
    color: '#F97316',
  },
});