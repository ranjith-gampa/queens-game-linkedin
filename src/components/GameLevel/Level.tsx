import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import Board from "./components/Board";
import { createEmptyBoard } from "../../utils/board";
import { levels } from "../../utils/levels";
import BackIcon from "../icons/BackIcon";
import PreviousIcon from "../icons/PreviousIcon";
import NextIcon from "../icons/NextIcon";
import ResetIcon from "../icons/ResetIcon";
import WinningScreen from "./components/WinningScreen";
import Queen from "../Queen";
import HowToPlay from "./components/HowToPlay";
import SettingsDialog from "./components/SettingsDialog";
import Timer from "./components/Timer";
import getNavigationLevels from "@/utils/getNavigationLevels";
import Button from "../Button";
import useVisibility from "../../hooks/useVisibility";
import useGameLogic from "@/hooks/useGameLogic";
import { getGiscusLanguage } from "@/utils/getGiscusLanguage";
import { getLevelCompletionTimes } from "@/utils/localStorage";
import RetryCooldownDialog from "./components/RetryCooldownDialog";

interface LevelProps {
  id: string;
  level: string;
}

const Level: React.FC<LevelProps> = ({ id, level }) => {
  const { theme } = useTheme();
  const [showRetryDialog, setShowRetryDialog] = useState(false);
  const [retryCooldown, setRetryCooldown] = useState(0);

  const levelSize = levels[level].size;

  const { t, i18n } = useTranslation();
  const isVisible = useVisibility();

  const { previousLevel, nextLevel, previousDisabled, nextDisabled } =
    getNavigationLevels(id, level);

  const boardSize = levelSize;
  const colorRegions = levels[level].colorRegions;
  const regionColors = levels[level].regionColors;

  const {
    board,
    hasWon,
    timer,
    showWinningScreen,
    clashingQueens,
    showClashingQueens,
    showInstructions,
    showClock,
    autoPlaceXs,
    timerRunning,
    completed,
    history,
    setBoard,
    setHasWon,
    setShowWinningScreen,
    setTimerRunning,
    handleSquareClick,
    handleDrag,
    handleUndo,
    handleTimeUpdate,
    toggleClashingQueens,
    toggleShowInstructions,
    toggleShowClock,
    toggleAutoPlaceXs,
  } = useGameLogic({
    id,
    boardSize,
    colorRegions,
  });

  const PreviousLevelButton: React.FC<{
    children: React.ReactNode;
    className: string;
  }> = ({ children, className }) => {
    return (
      <Link
        to={previousDisabled ? "#" : `/level/${previousLevel}`}
        className="flex"
      >
        <button
          disabled={previousDisabled}
          onClick={() => {
            setBoard(createEmptyBoard(levels[`level${previousLevel}`].size));
          }}
          className={className}
        >
          {children}
        </button>
      </Link>
    );
  };

  const NextLevelButton: React.FC<{
    children: React.ReactNode;
    className: string;
  }> = ({ children, className }) => {
    return (
      <Link to={nextDisabled ? "#" : `/level/${nextLevel}`} className="flex">
        <button
          disabled={nextDisabled}
          onClick={() => {
            setBoard(createEmptyBoard(levels[`level${nextLevel}`].size));
          }}
          className={className}
        >
          {children}
        </button>
      </Link>
    );
  };

  // Helper function to check cooldown using completion times
  const checkCooldown = (): number => {
    const completionTimes = getLevelCompletionTimes(id, "regular");
    if (completionTimes.length === 0) {
      return 0;
    }

    // Get the latest completion
    const latestCompletion = completionTimes.reduce((latest, current) =>
      current.timestamp > latest.timestamp ? current : latest
    );

    // Set cooldown duration based on environment
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const COOLDOWN_DURATION = isLocalhost ? 60 * 1000 : 15 * 60 * 1000; // 60s for localhost, 15 minutes for production
    const cooldownEndsAt = latestCompletion.timestamp + COOLDOWN_DURATION;
    const now = Date.now();
    
    if (now >= cooldownEndsAt) {
      return 0;
    }

    return Math.ceil((cooldownEndsAt - now) / 1000);
  };

  // Prevent any board interaction while in cooldown
  const handleSquareClickWithCooldown = (row: number, col: number) => {
    const cooldown = checkCooldown();
    if (cooldown > 0) {
      setRetryCooldown(cooldown);
      setShowRetryDialog(true);
      return;
    }
    handleSquareClick(row, col);
  };

  const handleSquareMouseEnterWithCooldown = (squares: number[][]) => {
    const cooldown = checkCooldown();
    if (cooldown > 0) return;
    handleDrag(squares);
  };

  useEffect(() => {
    if (!isVisible || hasWon) {
      setTimerRunning(false);
    }
    if (isVisible && !hasWon) {
      setTimerRunning(true);
    }
  }, [isVisible, hasWon]);

  // Check cooldown when component mounts or when returning to the level
  useEffect(() => {
    const remainingSeconds = checkCooldown();
    if (remainingSeconds > 0) {
      setRetryCooldown(remainingSeconds);
      setShowRetryDialog(true);
      setTimerRunning(false);
    }
  }, [id]);

  return (
    <div key={id} className="flex flex-col justify-center items-center pt-4">
      <RetryCooldownDialog
        open={showRetryDialog}
        onOpenChange={setShowRetryDialog}
        timeLeft={retryCooldown}
        onTimerComplete={() => setTimerRunning(true)}
      />

      <div className="flex flex-col items-center">
        <div>
          <div
            className={`flex items-center space-x-0 justify-between py-1 w-full ${
              showClock ? "mb-0" : "mb-2"
            }`}
          >
            <Link to="/" className="flex-none">
              <button className="border border-slate-500 rounded-full p-2">
                <BackIcon />
              </button>
            </Link>

            <div className="flex items-center space-x-2">
              <PreviousLevelButton className="disabled:opacity-50">
                <PreviousIcon />
              </PreviousLevelButton>

              <h2 className="text-xl text-center">
                {t("LEVEL")} {id}
              </h2>

              <NextLevelButton className="disabled:opacity-50">
                <NextIcon />
              </NextLevelButton>
            </div>

            <div className="flex flex-none justify-end">
              <div className="flex items-center">
                <Queen
                  size="24"
                  className={`fill-yellow-400 mr-2 ${
                    completed ? "visible" : "invisible"
                  }`}
                />
                <button
                  onClick={() => {
                    setBoard(createEmptyBoard(levelSize));
                    setHasWon(false);
                    setShowWinningScreen(false);
                    history.current = [];
                  }}
                  className="border border-slate-500 rounded-full p-2 mr-2"
                >
                  <ResetIcon size="18" />
                </button>
                <SettingsDialog
                  showClashingQueens={showClashingQueens}
                  toggleShowClashingQueens={toggleClashingQueens}
                  showInstructions={showInstructions}
                  toggleShowInstructions={toggleShowInstructions}
                  showClock={showClock}
                  toggleShowClock={toggleShowClock}
                  autoPlaceXs={autoPlaceXs}
                  toggleAutoPlaceXs={toggleAutoPlaceXs}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Timer
              run={timerRunning}
              onTimeUpdate={handleTimeUpdate}
              showTimer={showClock}
            />
          </div>

          <div className="game relative">
            {showWinningScreen && (
              <WinningScreen
                timer={showClock ? timer : 0}
                previousLevel={previousLevel}
                nextLevel={nextLevel}
                level={id}
                close={() => setShowWinningScreen(false)}
              />
            )}
            <Board
              board={board}
              handleSquareClick={handleSquareClickWithCooldown}
              handleSquareMouseEnter={handleSquareMouseEnterWithCooldown}
              level={level}
              boardSize={boardSize}
              colorRegions={colorRegions}
              regionColors={regionColors}
              showClashingQueens={showClashingQueens}
              clashingQueens={clashingQueens}
            />
          </div>
          <Button
            className="border border-slate-500 rounded-full p-2 mr-2 w-full mt-[16px]"
            onClick={handleUndo}
            disabled={hasWon || !history.current.length}
          >
            {t("UNDO")}
          </Button>
        </div>

        {showInstructions && <HowToPlay />}

        <div className="w-full px-2">
          <Giscus
            repo="ranjith-gampa/queens-game-linkedin"
            repoId="R_kgDOPAGqSA"
            category="Announcements"
            categoryId="DIC_kwDOPAGqSM4CsFoo"
            mapping="pathname"
            strict="1"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme={theme}
            lang={getGiscusLanguage(i18n.language) || i18n.language}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Level;
