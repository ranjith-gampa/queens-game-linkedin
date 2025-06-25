import React, { useState, useEffect } from 'react';
import formatDuration from '@/utils/formatDuration';
import { LeaderboardEntry } from '@/utils/types';
import { getLeaderboardEntries } from '@/utils/database';

const ROW_LIMIT = 100;

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [activeTab, setActiveTab] = useState<string>('regular');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [activeTab]);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getLeaderboardEntries(activeTab, ROW_LIMIT);
      setEntries(data);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      setError('Failed to load leaderboard data');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format date
  const formatDate = (timestamp: string): string => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="w-full max-w-[calc(100%-32px)] mx-auto bg-white rounded-lg p-4 mt-8 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      
      {/* Tab navigation */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded transition-colors ${
            activeTab === "regular" ? "bg-[#F96C51] text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("regular")}
        >
          Regular Levels
        </button>
        <button
          className={`px-4 py-2 rounded transition-colors ${
            activeTab === "bonus" ? "bg-[#F96C51] text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("bonus")}
        >
          Bonus Levels
        </button>
        <button
          className={`px-4 py-2 rounded transition-colors ${
            activeTab === "community" ? "bg-[#F96C51] text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("community")}
        >
          Community Levels
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-red-500 p-4 text-center">
          {error}
        </div>
      )}

      {/* Leaderboard content */}
      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <p>Loading...</p>
        </div>
      ) : entries.length > 0 ? (
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
              {entries.map((entry, index) => (
                <tr
                  key={`${entry.id}`}
                  className="border-b"
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{entry.avatar}</span>
                      <span>{entry.username}</span>
                    </div>
                  </td>
                  <td className="p-2">{entry.levelId}</td>
                  <td className="p-2">{formatDuration(entry.timeSeconds)}</td>
                  <td className="p-2">{formatDate(entry.completedAt)}</td>
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
