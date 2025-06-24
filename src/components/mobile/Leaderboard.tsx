import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { getAllLevelCompletionTimes, getUserProfile } from "@/utils/localStorage";
import { LevelCompletionTime } from "@/utils/types";
import formatDuration from "@/utils/formatDuration";

interface LeaderboardData extends LevelCompletionTime {
  username: string;
  avatar: string;
}

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);
  const [activeTab, setActiveTab] = useState<string>("regular");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Calculate width based on the device screen width
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth - 32; // 32px padding

  useEffect(() => {
    loadLeaderboardData();
  }, [activeTab]);

  const loadLeaderboardData = () => {
    setIsLoading(true);
    
    // Get all completion times
    const allCompletionTimes = getAllLevelCompletionTimes();
    
    // Filter by the active tab's level type
    const filteredTimes = allCompletionTimes.filter(
      time => time.levelType === activeTab
    );
    
    // Group by level ID to get only the fastest time per level
    const fastestTimesByLevel: { [levelId: string]: LevelCompletionTime } = {};
    
    filteredTimes.forEach(time => {
      if (!fastestTimesByLevel[time.id] || time.time < fastestTimesByLevel[time.id].time) {
        fastestTimesByLevel[time.id] = time;
      }
    });
    
    // Convert the object back to an array and sort by time (fastest first)
    const uniqueFastestTimes = Object.values(fastestTimesByLevel);
    uniqueFastestTimes.sort((a, b) => a.time - b.time);
    
    // Add user information
    const userProfile = getUserProfile();
    const leaderboardWithUserInfo = uniqueFastestTimes.map(time => ({
      ...time,
      username: time.username || userProfile?.username || "Anonymous",
      avatar: time.avatar || userProfile?.avatar || "👤"
    }));
    
    setLeaderboardData(leaderboardWithUserInfo);
    setIsLoading(false);
  };

  // Function to format the date from timestamp
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <View style={[styles.container, { width: containerWidth }]}>
      <Text style={styles.title}>Leaderboard</Text>
      
      {/* Tab navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "regular" && styles.activeTab]}
          onPress={() => setActiveTab("regular")}
        >
          <Text style={[styles.tabText, activeTab === "regular" && styles.activeTabText]}>Regular Levels</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "bonus" && styles.activeTab]}
          onPress={() => setActiveTab("bonus")}
        >
          <Text style={[styles.tabText, activeTab === "bonus" && styles.activeTabText]}>Bonus Levels</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "community" && styles.activeTab]}
          onPress={() => setActiveTab("community")}
        >
          <Text style={[styles.tabText, activeTab === "community" && styles.activeTabText]}>Community Levels</Text>
        </TouchableOpacity>
      </View>

      {/* Leaderboard content */}
      {isLoading ? (
        <View style={styles.centerContent}>
          <Text>Loading...</Text>
        </View>
      ) : leaderboardData.length > 0 ? (
        <ScrollView horizontal={true}>
          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <Text style={[styles.headerCell, { width: 50 }]}>Rank</Text>
              <Text style={[styles.headerCell, { width: 150 }]}>Player</Text>
              <Text style={[styles.headerCell, { width: 80 }]}>Level</Text>
              <Text style={[styles.headerCell, { width: 100 }]}>Time</Text>
              <Text style={[styles.headerCell, { width: 100 }]}>Date</Text>
            </View>

            {/* Table Body */}
            {leaderboardData.map((entry, index) => (
              <View key={`${entry.id}-${entry.timestamp}`} style={styles.tableRow}>
                <Text style={[styles.cell, { width: 50 }]}>{index + 1}</Text>
                <View style={[styles.playerCell, { width: 150 }]}>
                  <Text style={styles.avatar}>{entry.avatar}</Text>
                  <Text style={styles.username}>{entry.username}</Text>
                </View>
                <Text style={[styles.cell, { width: 80 }]}>{entry.id}</Text>
                <Text style={[styles.cell, { width: 100 }]}>{formatDuration(entry.time)}</Text>
                <Text style={[styles.cell, { width: 100 }]}>{formatDate(entry.timestamp)}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.centerContent}>
          <Text>No completion times recorded for {activeTab} levels yet.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  tabButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  tableContainer: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingVertical: 12,
  },
  headerCell: {
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  cell: {
    paddingHorizontal: 8,
  },
  playerCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  avatar: {
    fontSize: 20,
  },
  username: {
    fontSize: 16,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
});

export default Leaderboard;
