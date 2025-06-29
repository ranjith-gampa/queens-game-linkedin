import { useState, useEffect } from 'react';
import formatDuration from '@/utils/formatDuration';
import { LeaderboardEntry } from '@/utils/types';
import { getLeaderboardEntries, getTodayLeaderboardEntries } from '@/utils/database';
import { getDailyLevelNumber } from '@/utils/getDailyLevel';

const ROW_LIMIT = 100;

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'regular' | 'bonus' | 'community'>('regular');
  const [timeView, setTimeView] = useState<'today' | 'all-time' | 'my'>('today');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: 'levelId' | 'timeSeconds' | 'username' | 'completedAt';
    direction: 'asc' | 'desc';
    secondaryKey?: 'levelId' | 'timeSeconds' | 'username' | 'completedAt';
    secondaryDirection?: 'asc' | 'desc';
  }>({ key: 'timeSeconds', direction: 'asc' });
  const [prevEntries, setPrevEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsTransitioning(true);
      setPrevEntries(entries);

      await new Promise(resolve => setTimeout(resolve, 100));
      
      try {
        if (timeView === 'today') {
          if (activeTab === 'regular') {
            const dailyLevel = getDailyLevelNumber();
            const data = await getTodayLeaderboardEntries(activeTab, dailyLevel.toString(), ROW_LIMIT);
            setEntries(sortEntries(data));
          } else {
            setEntries([]);
          }
        } else if (timeView === 'my') {
          const userProfile = localStorage.getItem('userProfile');
          if (!userProfile) {
            setError('Please set up your profile to view your records');
            setEntries([]);
          } else {
            const { userId } = JSON.parse(userProfile);
            const data = await getLeaderboardEntries(activeTab, ROW_LIMIT, userId);
            setEntries(sortEntries(data));
          }
        } else {
          const data = await getLeaderboardEntries(activeTab, ROW_LIMIT);
          setEntries(sortEntries(data));
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        setError('Failed to load leaderboard data');
      } finally {
        setIsLoading(false);
        setTimeout(() => setIsTransitioning(false), 300);
      }
    };

    fetchData();
  }, [activeTab, timeView]);

  const formatDate = (timestamp: string): string => {
    return new Date(timestamp).toLocaleDateString();
  };

  const handleTimeViewChange = (view: 'today' | 'all-time' | 'my') => {
    setTimeView(view);
    if (view === 'today') {
      setActiveTab('regular');
    }
  };

  const sortEntries = (entriesToSort: LeaderboardEntry[]) => {
    return [...entriesToSort].sort((a, b) => {
      const multiplier = sortConfig.direction === 'asc' ? 1 : -1;
      
      switch (sortConfig.key) {
        case 'levelId':
          const aLevel = parseInt(a.levelId);
          const bLevel = parseInt(b.levelId);
          return multiplier * (aLevel - bLevel);
          
        case 'timeSeconds':
          return multiplier * (a.timeSeconds - b.timeSeconds);
          
        case 'username':
          return multiplier * a.username.localeCompare(b.username);
          
        case 'completedAt':
          return multiplier * (new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());
          
        default:
          return 0;
      }
    });
  };

  const handleSort = (key: 'levelId' | 'timeSeconds' | 'username' | 'completedAt') => {
    // Calculate new sort config
    const newSortConfig: {
      key: 'levelId' | 'timeSeconds' | 'username' | 'completedAt';
      direction: 'asc' | 'desc';
      secondaryKey?: 'levelId' | 'timeSeconds' | 'username' | 'completedAt';
      secondaryDirection?: 'asc' | 'desc';
    } = {
      key,
      direction: sortConfig.key === key ? 
        (sortConfig.direction === 'asc' ? 'desc' : 'asc') : 
        'asc'
    };

    // If switching from a different column, store it as secondary sort
    if (sortConfig.key !== key && sortConfig.key !== 'completedAt') {
      newSortConfig.secondaryKey = sortConfig.key;
      newSortConfig.secondaryDirection = sortConfig.direction;
    }
    
    setSortConfig(newSortConfig);
    
    setEntries(prevEntries => [...prevEntries].sort((a, b) => {
      const compare = (val1: any, val2: any, sortDir: 'asc' | 'desc'): number => {
        const multiplier = sortDir === 'asc' ? 1 : -1;
        if (typeof val1 === 'string' && typeof val2 === 'string') {
          return multiplier * val1.localeCompare(val2);
        }
        return multiplier * (val1 - val2);
      };

      // Primary sort
      let result = 0;
      switch (newSortConfig.key) {
        case 'levelId':
          result = compare(parseInt(a.levelId), parseInt(b.levelId), newSortConfig.direction);
          break;
        case 'timeSeconds':
          result = compare(a.timeSeconds, b.timeSeconds, newSortConfig.direction);
          break;
        case 'username':
          result = compare(a.username, b.username, newSortConfig.direction);
          break;
        case 'completedAt':
          result = compare(new Date(a.completedAt).getTime(), new Date(b.completedAt).getTime(), newSortConfig.direction);
          break;
      }

      // If primary sort results in a tie and we have a secondary sort key
      if (result === 0 && newSortConfig.secondaryKey && newSortConfig.secondaryDirection) {
        switch (newSortConfig.secondaryKey) {
          case 'levelId':
            return compare(parseInt(a.levelId), parseInt(b.levelId), newSortConfig.secondaryDirection);
          case 'timeSeconds':
            return compare(a.timeSeconds, b.timeSeconds, newSortConfig.secondaryDirection);
          case 'username':
            return compare(a.username, b.username, newSortConfig.secondaryDirection);
          case 'completedAt':
            return compare(new Date(a.completedAt).getTime(), new Date(b.completedAt).getTime(), newSortConfig.secondaryDirection);
        }
      }

      return result;
    }));
  };

  const renderLeaderboardContent = (data: LeaderboardEntry[]) => (
    data.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-2 text-left w-12 text-card-foreground">Rank</th>
              <th className="p-2 text-left w-40 text-card-foreground">
                <button
                  onClick={() => handleSort('username')}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Player
                  {sortConfig.key === 'username' && (
                    <span className="text-xs">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </th>
              <th className="p-2 text-left w-20 text-card-foreground">
                <button
                  onClick={() => handleSort('levelId')}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Level
                  {sortConfig.key === 'levelId' && (
                    <span className="text-xs">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </th>
              <th className="p-2 text-left w-24 text-card-foreground">
                <button
                  onClick={() => handleSort('timeSeconds')}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Time
                  {sortConfig.key === 'timeSeconds' && (
                    <span className="text-xs">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </th>
              <th className="p-2 text-left w-24 text-card-foreground">
                <button
                  onClick={() => handleSort('completedAt')}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Date
                  {sortConfig.key === 'completedAt' && (
                    <span className="text-xs">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </th>
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
        <button
          className={`px-4 py-2 rounded transition-colors border ${
            timeView === 'my' 
              ? "bg-primary text-white border-primary" 
              : "bg-background border-border hover:bg-muted/20"
          }`}
          onClick={() => handleTimeViewChange('my')}
        >
          My Records
        </button>
      </div>

      {/* Level type navigation - only show for all-time and my view */}
      {(timeView === 'all-time' || timeView === 'my') && (
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
