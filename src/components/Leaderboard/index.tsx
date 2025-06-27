import React, { useState, useEffect } from 'react';
import formatDuration from '@/utils/formatDuration';
import { LeaderboardEntry } from '@/utils/types';
import { getLeaderboardEntries, getTodayLeaderboardEntries } from '@/utils/database';
import { getDailyLevelNumber } from '@/utils/getDailyLevel';

const ROW_LIMIT = 100;

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'regular' | 'bonus' | 'community'>('regular');
  const [timeView, setTimeView] = useState<'today' | 'all-time'>('today');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Add states for managing transitions
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevEntries, setPrevEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Set loading and transition states first
      setIsLoading(true);
      setIsTransitioning(true);
      setPrevEntries(entries);

      // Delay the actual data fetch to show loading state
      await new Promise(resolve => setTimeout(resolve, 100));
      
      try {
        if (timeView === 'today') {
          if (activeTab === 'regular') {
            const dailyLevel = getDailyLevelNumber();
            const data = await getTodayLeaderboardEntries(activeTab, dailyLevel.toString(), ROW_LIMIT);
            setEntries(data);
          } else {
            setEntries([]);
          }
        } else {
          const data = await getLeaderboardEntries(activeTab, ROW_LIMIT);
          setEntries(data);
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        setError('Failed to load leaderboard data');
      } finally {
        setIsLoading(false);
        // Add a small delay before removing the transition state
        setTimeout(() => setIsTransitioning(false), 300);
      }
    };

    fetchData();
  }, [activeTab, timeView]);

  // Function to format date
  const formatDate = (timestamp: string): string => {
    return new Date(timestamp).toLocaleDateString();
  };

  const handleTimeViewChange = (view: 'today' | 'all-time') => {
    setTimeView(view);
    if (view === 'today') {
      setActiveTab('regular');
    }
  };

  const renderLeaderboardContent = (data: LeaderboardEntry[]) => (
    data.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-2 text-left w-12 text-card-foreground">Rank</th>
              <th className="p-2 text-left w-40 text-card-foreground">Player</th>
              <th className="p-2 text-left w-20 text-card-foreground">Level</th>
              <th className="p-2 text-left w-24 text-card-foreground">Time</th>
              <th className="p-2 text-left w-24 text-card-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr
                key={`${entry.id}`}
                className="border-b border-border text-card-foreground"
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
      <div className="flex justify-center items-center p-8 text-card-foreground">
        <p>
          {timeView === 'today' 
            ? `No completion times recorded for today's level yet.`
            : `No completion times recorded for ${activeTab} levels yet.`
          }
        </p>
      </div>
    )
  );

  return (
    <div className="w-full max-w-[calc(100%-32px)] mx-auto bg-background text-card-foreground rounded-lg p-4 mt-8 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      
      {/* Time view navigation */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded transition-colors border ${
            timeView === 'today' 
              ? "bg-primary text-white border-primary" 
              : "bg-background border-border hover:bg-muted/20"
          }`}
          onClick={() => handleTimeViewChange('today')}
        >
          Daily Level
        </button>
        <button
          className={`px-4 py-2 rounded transition-colors border ${
            timeView === 'all-time' 
              ? "bg-primary text-white border-primary" 
              : "bg-background border-border hover:bg-muted/20"
          }`}
          onClick={() => handleTimeViewChange('all-time')}
        >
          All-Time
        </button>
      </div>

      {/* Level type navigation - only show for all-time view */}
      {timeView === 'all-time' && (
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded transition-colors border ${
              activeTab === 'regular' 
                ? "bg-primary text-white border-primary" 
                : "bg-background border-border hover:bg-muted/20"
            }`}
            onClick={() => setActiveTab('regular')}
          >
            Regular Levels
          </button>
          <button
            className={`px-4 py-2 rounded transition-colors border ${
              activeTab === 'bonus' 
                ? "bg-primary text-white border-primary" 
                : "bg-background border-border hover:bg-muted/20"
            }`}
            onClick={() => setActiveTab('bonus')}
          >
            Bonus Levels
          </button>
          <button
            className={`px-4 py-2 rounded transition-colors border ${
              activeTab === 'community' 
                ? "bg-primary text-white border-primary" 
                : "bg-background border-border hover:bg-muted/20"
            }`}
            onClick={() => setActiveTab('community')}
          >
            Community Levels
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-red-500 p-4 text-center">
          {error}
        </div>
      )}

      {/* Leaderboard content with transitions */}
      <div className="relative min-h-[200px] overflow-hidden">
        {/* Previous content for smooth transition */}
        {isTransitioning && (
          <div className="absolute w-full transition-opacity duration-300 ease-in-out opacity-0">
            {renderLeaderboardContent(prevEntries)}
          </div>
        )}
        
        {/* Current content */}
        <div 
          className={`transition-all duration-300 ease-in-out ${
            isLoading || isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {renderLeaderboardContent(entries)}
        </div>

        {/* Loading overlay */}
        <div className={`absolute inset-0 flex items-center justify-center bg-background/50 transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <p className="text-card-foreground">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
