import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CloseIcon from "../../icons/CloseIcon";
import formatDuration from "@/utils/formatDuration";
import goldCrown from "@/assets/gold-crown.svg";
import goldenChicletBg from "@/assets/golden-chiclet-bg.svg";
import { getLevelsBySize } from "@/utils/getAvailableLevels";
import { saveLevelCompletionTime } from "@/utils/localStorage";
import { getDailyLevelNumber } from "@/utils/getDailyLevel";
import { updateStreakOnLevelCompletion, saveStreakData, getStreakData } from "@/utils/streak";
import { initializeNotifications } from "@/utils/notifications";
import StreakDisplay from "@/components/StreakDisplay";

interface LevelNavigationButtonProps {
  level: number | null;
  text: string;
  isTextSmall: boolean;
}

const LevelNavigationButton = ({
  level,
  text,
  isTextSmall,
}: LevelNavigationButtonProps) => (
  <Link to={!level ? "#" : `/level/${level}`} className="flex">
    <button
      disabled={!level}
      className={`${
        isTextSmall ? "text-lg" : "text-xl"
      } min-w-36 rounded border px-3 py-1 w-full border-white disabled:border-white/50 disabled:text-white/50`}
    >
      {text}
    </button>
  </Link>
);

interface WinningScreenProps {
  timer: number;
  previousLevel: number | number[] | null;
  nextLevel: number | number[] | null;
  level: string;
  close: () => void;
}

const WinningScreen = ({
  timer,
  previousLevel,
  nextLevel,
  level,
  close,
}: WinningScreenProps) => {
  const { t } = useTranslation();
  const [isFastestTime, setIsFastestTime] = useState(false);
  const [previousFastestTime, setPreviousFastestTime] = useState<number | null>(null);
  const [streakData, setStreakData] = useState(getStreakData());
  const [isDailyLevel, setIsDailyLevel] = useState(false);

  const isGroupedBySize = localStorage.getItem("groupBySize") === "true";

  let updatedPreviousLevel = Array.isArray(previousLevel) ? previousLevel[0] : previousLevel;
  let updatedNextLevel = Array.isArray(nextLevel) ? nextLevel[0] : nextLevel;
  let previousLevelText = t("PREVIOUS_LEVEL");
  let nextLevelText = t("NEXT_LEVEL");

  // Check if this is today's daily level
  useEffect(() => {
    const dailyLevelNumber = getDailyLevelNumber();
    const isDaily = Number(level) === dailyLevelNumber;
    setIsDailyLevel(isDaily);

    if (isDaily) {
      // Update streak for daily level completion
      const updatedStreak = updateStreakOnLevelCompletion();
      setStreakData(updatedStreak);
    }
  }, [level]);

  const handleNotificationToggle = (enabled: boolean) => {
    const updatedData = { ...streakData, notificationsEnabled: enabled };
    setStreakData(updatedData);
    saveStreakData(updatedData);
    initializeNotifications(enabled);
  };

  const updateLevelNavigation = () => {
    const levelsBySize = getLevelsBySize();

    for (let size in levelsBySize) {
      const levels = levelsBySize[size];

      const currentIndex = levels.indexOf(Number(level));
      const isValidCurrentIndex = currentIndex !== -1;
      if (isValidCurrentIndex) {
        if (!updatedNextLevel) {
          const nextSize = levelsBySize[Number(size) + 1];
          if (nextSize) {
            updatedNextLevel = nextSize[0];
            const playSize = `${Number(size) + 1}x${Number(size) + 1}`;
            nextLevelText = t("PLAY_SIZE", { playSize });
          }
        }
        if (!updatedPreviousLevel) {
          const previousSize = levelsBySize[Number(size) - 1];
          if (previousSize) {
            updatedPreviousLevel = previousSize[0];
            const playSize = `${Number(size) - 1}x${Number(size) - 1}`;
            previousLevelText = t("PLAY_SIZE", { playSize });
          }
        }
        break;
      }
    }
  };

  if (isGroupedBySize && (!updatedPreviousLevel || !updatedNextLevel)) {
    updateLevelNavigation();
  }

  useEffect(() => {
    if (timer > 0) {
      saveLevelCompletionTime(
        Number(level),
        timer,
        'regular'
      ).then(({ isFastest, previousFastestTime: prevFastest }) => {
        setIsFastestTime(isFastest);
        setPreviousFastestTime(prevFastest);
      });
    }
  }, [timer, level]);

  return (
    <div
      className={`absolute flex flex-col items-center justify-start text-center rounded-lg bg-purple text-white text-xl ${
        isDailyLevel ? 'w-[420px] max-h-[85vh]' : 'w-80 max-h-[80vh]'
      } max-w-[95vw] font-bold p-4 select-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 overflow-y-auto scrollbar-thin`}
    >
      <button className="absolute right-3 top-3 z-20" onClick={close}>
        <CloseIcon />
      </button>
      <img
        src={goldCrown}
        alt="Crown"
        className={`align-items-center ${timer ? "mb-1" : "mb-3"}`}
        width={`${timer ? "52" : "64"}`}
        height={`${timer ? "52" : "64"}`}
      />
      <div className={`${timer ? "text-xl mb-3" : "text-2xl mb-6"}`}>
        {t("YOU_WIN")}
      </div>

      <div className="flex flex-col space-y-3 w-full">
        {timer > 0 && (
          <>
            <div className="relative flex justify-center">
              <img
                src={goldenChicletBg}
                alt="Golden chiclet background"
                className="rounded w-full h-16 object-cover"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black">
                <div className="text-lg">{formatDuration(timer)}</div>
                <div className="font-medium text-sm">{t("SOLVE_TIME")}</div>
              </div>
            </div>
            {isFastestTime && previousFastestTime && (
              <div className="bg-green-600 rounded-md px-3 py-2 border-2 border-yellow-300 w-full text-lg animate-pulse shadow-lg">
                <div className="font-extrabold">🏆 {t("NEW_FASTEST_TIME")}! 🏆</div>
                <div className="text-sm font-medium mt-1">
                  {t("PREVIOUS_BEST")}: {formatDuration(previousFastestTime)}
                </div>
              </div>
            )}
          </>
        )}
        
        {/* Show streak display for daily levels */}
        {isDailyLevel && (
          <div className="mt-2">
            <StreakDisplay 
              streakData={streakData} 
              onNotificationToggle={handleNotificationToggle}
            />
          </div>
        )}
        
        <LevelNavigationButton
          level={updatedPreviousLevel}
          text={previousLevelText}
          isTextSmall={!!timer}
        />
        <LevelNavigationButton
          level={updatedNextLevel}
          text={nextLevelText}
          isTextSmall={!!timer}
        />
      </div>
    </div>
  );
};

export default WinningScreen;