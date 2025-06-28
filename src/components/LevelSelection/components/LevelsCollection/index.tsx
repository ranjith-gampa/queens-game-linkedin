import React from 'react';
import GroupedLevelsGrid from './GroupedLevelsGrid'
import UngroupedLevelsGrid from "./UngroupedLevelsGrid";
import { LevelSelectionFilters } from '../../interfaces';

interface LevelsCollectionProps extends LevelSelectionFilters {
  className: string;
  groupBySize: boolean;
}

const LevelsCollection: React.FC<LevelsCollectionProps> = ({
  showOnlyAvailableLevels,
  hideCompletedLevels,
  groupBySize,
  sortDirection = 'desc',
  className,
}) => {
  return (
    <div className={`text-sm ${className}`}>
      {
        groupBySize 
          ? <GroupedLevelsGrid 
              showOnlyAvailableLevels={showOnlyAvailableLevels} 
              hideCompletedLevels={hideCompletedLevels}
              sortDirection={sortDirection} 
            /> 
          : <UngroupedLevelsGrid 
              showOnlyAvailableLevels={showOnlyAvailableLevels} 
              hideCompletedLevels={hideCompletedLevels}
              sortDirection={sortDirection} 
              className={className} 
            />
      }
    </div>
  );
};

export default LevelsCollection;
