import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getAllLevelCompletionTimes, getUserProfile } from "@/utils/localStorage";
import { LevelCompletionTime } from "@/utils/types";
import formatDuration from "@/utils/formatDuration";

interface LeaderboardData extends LevelCompletionTime {
  username: string;
  avatar: string;
}

const LeaderboardComponent = () => {
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
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="mt-8 p-2 px-4 sm:p-4 bg-card rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      
      {/* Tab navigation */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant={activeTab === "regular" ? "default" : "outline"}
          onClick={() => setActiveTab("regular")}
          className="text-sm"
        >
          Regular Levels
        </Button>
        <Button 
          variant={activeTab === "bonus" ? "default" : "outline"}
          onClick={() => setActiveTab("bonus")}
          className="text-sm"
        >
          Bonus Levels
        </Button>
        <Button 
          variant={activeTab === "community" ? "default" : "outline"}
          onClick={() => setActiveTab("community")}
          className="text-sm"
        >
          Community Levels
        </Button>
      </div>
      
      {/* Leaderboard table */}
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : leaderboardData.length > 0 ? (
        <div className="overflow-x-auto w-full max-w-full">
          <table className="w-full min-w-[500px] divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-2 py-2 text-left text-xs sm:text-sm sm:px-4">Rank</th>
                <th className="px-2 py-2 text-left text-xs sm:text-sm sm:px-4">Player</th>
                <th className="px-2 py-2 text-left text-xs sm:text-sm sm:px-4">Level</th>
                <th className="px-2 py-2 text-left text-xs sm:text-sm sm:px-4">Time</th>
                <th className="px-2 py-2 text-left text-xs sm:text-sm sm:px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leaderboardData.map((entry, index) => (
                <tr key={`${entry.id}-${entry.timestamp}`} className="hover:bg-muted/50">
                  <td className="px-2 py-2 sm:px-4 sm:py-3">{index + 1}</td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl">{entry.avatar}</span>
                      <span className="text-sm sm:text-base truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">{entry.username}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm md:text-base">{entry.id}</td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm md:text-base">{formatDuration(entry.time)}</td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm md:text-base">{formatDate(entry.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          No completion times recorded for {activeTab} levels yet.
        </div>
      )}
    </div>
  );
};

export default LeaderboardComponent;