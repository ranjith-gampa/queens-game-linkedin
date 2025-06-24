import React, { useState, useEffect } from "react";
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
    // flex space-x-2 mb-4
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="w-full max-w-[calc(100%-32px)] mx-auto bg-white rounded-lg p-4 mt-8 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
     
      {/* Tab navigation */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "regular"
              ? "bg-[#F96C51] text-white"
              : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("regular")}
        >
          Regular Levels
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "bonus"
              ? "bg-[#F96C51] text-white"
              : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("bonus")}
        >
          Bonus Levels
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "community"
              ? "bg-[#F96C51] text-white"
              : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("community")}
        >
          Community Levels
        </button>
      </div>

      {/* Leaderboard content */}
      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <p>Loading...</p>
        </div>
      ) : leaderboardData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left w-12">Rank</th>
                <th className="p-2 text-left w-40">Player</th>
                <th className="p-2 text-left w-20">Level</th>
                <th className="p-2 text-left w-24">Time</th>
                <th className="p-2 text-left w-24">Date</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr
                  key={`${entry.id}-${entry.timestamp}`}
                  className="border-b"
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{entry.avatar}</span>
                      <span>{entry.username}</span>
                    </div>
                  </td>
                  <td className="p-2">{entry.id}</td>
                  <td className="p-2">{formatDuration(entry.time)}</td>
                  <td className="p-2">{formatDate(entry.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center p-8">
          <p>No completion times recorded for {activeTab} levels yet.</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
