import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
// @ts-expect error js file
import { getLevelsBySize } from "@/utils/getAvailableLevels";
// @ts-ignore
import LevelButton from "@/components/LevelSelection/components/LevelButton";
import filterLevel from "./filterLevel";
// @ts-expect error js file
import { getOrderedLevels } from "@/utils/getAvailableLevels";
import { LevelSelectionFilters } from "../../interfaces";
import { levels as levelDetails } from "@/utils/levels";

type GroupedLevelsGridProps = LevelSelectionFilters;

const levelsBySize: Record<string, number[]> = getLevelsBySize();
const orderedLevels = getOrderedLevels();

const GroupedLevelsGrid: React.FC<GroupedLevelsGridProps> = ({
  showOnlyAvailableLevels,
  hideCompletedLevels,
  sortDirection = "desc",
}) => {
  const { t } = useTranslation();
  const levelsBySizeFiltered = useMemo(() => {
    const filtered = Object.entries(levelsBySize).reduce(
      (acc: Record<string, number[]>, [size, levels]) => {
        acc[size] = levels.filter((level) =>
          filterLevel(level, orderedLevels, {
            showOnlyAvailableLevels,
            hideCompletedLevels,
          })
        ).sort((a, b) => (sortDirection === "asc" ? a - b : b - a)); // Sort levels within each size group
        return acc;
      },
      {}
    );

    // Sort the groups by size
    return Object.fromEntries(
      Object.entries(filtered).sort(([sizeA], [sizeB]) => {
        const a = parseInt(sizeA);
        const b = parseInt(sizeB);
        return sortDirection === "asc" ? a - b : b - a;
      })
    );
  }, [showOnlyAvailableLevels, hideCompletedLevels, sortDirection]);

  return (
    <>
      {Object.entries(levelsBySizeFiltered).map(([size, levels]) => (
        <div key={size} className="mb-1 p-1">
          <h3 className="font-medium mb-1 text-center text-lg">
            {size}x{size}
          </h3>
          {levels.length === 0 && (
            <div className="text-center mb-3">{t("ALL_LEVELS_COMPLETED")}</div>
          )}
          <div className="grid grid-cols-8 sm:grid-cols-10 gap-1">
            {levels.map((level) => {
              const isNew = levelDetails[`level${level}`]?.isNew;
              return <LevelButton key={level} level={level} isNew={isNew} />;
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default GroupedLevelsGrid;
