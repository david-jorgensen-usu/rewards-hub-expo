import { recentEntries } from '@/data/recentEntries';
import { rewards } from '@/data/rewardsData';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function RewardsPage() {
  const router = useRouter();
  const [points] = useState(1250);

  const nextMilestone = 2000;
  const progress = (points / nextMilestone) * 100;

  const mergedEntries = recentEntries.map(entry => {
    const reward = rewards.find(r => r.reference === entry.brand);

    return {
      ...entry,          // keep all entry fields
      ...(reward || {}), // flatten all reward fields if found
    };
  });


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={['#fef3c7', '#fed7aa', '#fef3c7']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.greeting}>Hi John! 👋</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeIcon}>🏆</Text>
              </View>
            </View>
          </View>

          {/* Points Card */}
          <View style={styles.cardContainer}>
            <LinearGradient
              colors={['#f59e0b', '#ea580c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.pointsCard}
            >
              <View style={styles.pointsHeader}>
                <View>
                  <Text style={styles.pointsLabel}>Total Points</Text>
                  <Text style={styles.pointsValue}>
                    {points.toLocaleString()}
                  </Text>
                </View>
                <Text style={styles.starIcon}>⭐</Text>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>
                    📈 Next milestone
                  </Text>
                  <Text style={styles.progressTarget}>
                    {nextMilestone.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${progress}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {nextMilestone - points} points to go!
                </Text>
              </View>

              {/* CTA Button */}
              <TouchableOpacity 
                style={styles.exploreButton} 
                activeOpacity={0.8}
                onPress={() => router.replace('/rewards')}
              >
                <Text style={styles.exploreButtonText}>
                  🎁 Explore Rewards
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Recent Entries */}
          <View style={styles.recentSection}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentTitle}>Recent Activity</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            {/* Entries List */}
            <View style={styles.entriesList}>
              {mergedEntries.map((entry) => (
                <TouchableOpacity
                  key={entry.id}
                  style={styles.entryCard}
                  activeOpacity={0.7}
                  onPress={() => router.push(`/rewards/${entry.reference}`)}
                >
                  <View style={styles.entryContent}>
                    <View style={styles.entryLeft}>
                      <ImageBackground
                        style={styles.logoContainer}
                        source={entry.logoFile}
                        imageStyle={{ borderRadius: 10 }}
                      >
                      </ImageBackground>
                      <View>
                        <Text style={styles.brandName}>{entry.name}</Text>
                        <Text style={styles.entryDate}>{entry.date}</Text>
                      </View>
                    </View>
                    <View style={styles.entryRight}>
                      <Text style={styles.entryPoints}>+{entry.points}</Text>
                      <Text style={styles.pointsSmallLabel}>points</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef3c7',
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
  },
  badge: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  badgeIcon: {
    fontSize: 24,
  },
  cardContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  pointsCard: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  pointsLabel: {
    color: '#fde68a',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  pointsValue: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  starIcon: {
    fontSize: 32,
  },
  progressContainer: {
    marginTop: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  progressTarget: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarBg: {
    backgroundColor: 'rgba(180, 83, 9, 0.3)',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: '#ffffff',
    height: '100%',
    borderRadius: 6,
  },
  progressText: {
    color: '#fde68a',
    fontSize: 12,
    marginTop: 8,
  },
  exploreButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  exploreButtonText: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentSection: {
    paddingHorizontal: 24,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  viewAllText: {
    color: '#f59e0b',
    fontSize: 14,
    fontWeight: 'bold',
  },
  entriesList: {
    gap: 12,
  },
  entryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  entryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoContainer: {
    width: 56,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  logoEmoji: {
    fontSize: 28,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  entryDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  entryRight: {
    alignItems: 'flex-end',
  },
  entryPoints: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  pointsSmallLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navIconActive: {
    fontSize: 24,
  },
  navIcon: {
    fontSize: 24,
    opacity: 0.5,
  },
  navLabelActive: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9ca3af',
  },
});