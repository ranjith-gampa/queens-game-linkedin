import React, { useEffect, useState } from "react";
import LevelSelectionFilters from "./components/LevelSelectionFilters";
import LevelsCollection from "./components/LevelsCollection";
import LinkedInNote from "./components/LinkedInNote";

import Leaderboard from "@/components/Leaderboard/index";
import {
  getGroupingPreference,
  setGroupingPreference,
  getHideCompletedLevelsPreference,
  setHideCompletedLevelsPreference,
} from "@/utils/localStorage";
import GroupIcon from "../icons/GroupIcon";
import UngroupIcon from "../icons/UngroupIcon";
import SortAscIcon from "../icons/SortAscIcon";
import SortDescIcon from "../icons/SortDescIcon";

const LevelSelection = () => {
  const [showOnlyAvailableLevels, setShowOnlyAvailableLevels] = useState(false);
  const [
    onlyAvailableLevelsSwitchDisable,
    setOnlyAvailableLevelsSwitchDisable,
  ] = useState(false);
  const [hideCompletedLevels, setHideCompletedLevels] = useState(
    getHideCompletedLevelsPreference
  );
  const [groupBySize, setGroupBySize] = useState(getGroupingPreference);
  const [sortDirection, setSortDirection] = useState("desc"); // Add sort direction state

  useEffect(() => {
    setOnlyAvailableLevelsSwitchDisable(groupBySize || hideCompletedLevels);
  }, [groupBySize, hideCompletedLevels]);

  const toggleHideCompletedLevels = () => {
    const newSetting = !hideCompletedLevels;
    setHideCompletedLevels(newSetting);
    setHideCompletedLevelsPreference(newSetting);
  };

  const toggleGroupBySize = () => {
    const newSetting = !groupBySize;
    setGroupBySize(newSetting);
    setGroupingPreference(newSetting);
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="flex flex-col justify-center items-center w-fit mx-auto">
      <div className="flex w-full justify-between mb-2">
        <LevelSelectionFilters
          availableLevelsChecked={showOnlyAvailableLevels}
          completedLevelsChecked={hideCompletedLevels}
          availableLevelsDisabled={onlyAvailableLevelsSwitchDisable}
          onAvailableLevelsChange={() =>
            setShowOnlyAvailableLevels((prev) => !prev)
          }
          onCompletedLevelsChange={toggleHideCompletedLevels}
        />
        <div className="flex items-center space-x-1 mx-1">
          <button
            onClick={toggleSortDirection}
            className="hover:bg-muted/20 p-2 rounded"
            title={sortDirection === "desc" ? "Sort ascending" : "Sort descending"}
          >
            {sortDirection === "desc" ? <SortDescIcon /> : <SortAscIcon />}
          </button>
          <button onClick={toggleGroupBySize}>
            {groupBySize ? <GroupIcon /> : <UngroupIcon />}
          </button>
        </div>
      </div>
      <LevelsCollection
        showOnlyAvailableLevels={showOnlyAvailableLevels}
        hideCompletedLevels={hideCompletedLevels}
        groupBySize={groupBySize}
        sortDirection={sortDirection}
        className="mb-3"
      />
      <Leaderboard />
      <LinkedInNote />
    </div>
  );
};

export default LevelSelection;