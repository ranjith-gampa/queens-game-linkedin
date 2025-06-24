# Queens Game Architecture

## Component Hierarchy

The Queens Game application follows a hierarchical component structure:

```
App
├── ThemeProvider
│   ├── Router
│   │   ├── PageLevelSelection
│   │   │   ├── LevelsCollection
│   │   │   │   ├── GroupedLevelsGrid
│   │   │   │   └── UngroupedLevelsGrid
│   │   │   ├── LevelSelectionFilters
│   │   │   ├── ResetAllProgressDialog
│   │   │   └── SupportMeIconButton
│   │   │
│   │   ├── PageGameLevel
│   │   │   └── Level
│   │   │       ├── Board
│   │   │       │   └── Square
│   │   │       │       ├── Queen
│   │   │       │       └── Cross
│   │   │       ├── Timer
│   │   │       ├── HowToPlay
│   │   │       ├── SettingsDialog
│   │   │       └── WinningScreen
│   │   │
│   │   ├── PageBonusLevel
│   │   │   └── BonusLevel
│   │   │       ├── Board
│   │   │       │   └── Square
│   │   │       │       ├── Queen
│   │   │       │       └── Cross
│   │   │       ├── Timer
│   │   │       ├── HowToPlay
│   │   │       ├── SettingsDialog
│   │   │       └── WinningScreen
│   │   │
│   │   ├── PageCommunityLevel
│   │   │   └── CommunityLevel
│   │   │       ├── Board
│   │   │       │   └── Square
│   │   │       │       ├── Queen
│   │   │       │       └── Cross
│   │   │       ├── Timer
│   │   │       ├── HowToPlay
│   │   │       ├── SettingsDialog
│   │   │       └── WinningScreen
│   │   │
│   │   ├── PageLevelBuilder
│   │   │   └── LevelBuilder
│   │   │       ├── Board
│   │   │       │   └── Square
│   │   │       ├── LevelBuilderSelector
│   │   │       ├── BoardSizeInput
│   │   │       ├── LevelNameInput
│   │   │       ├── TestLevel
│   │   │       └── CommunityLevel components
│   │   │
│   │   └── PageNotFound
│   │
│   └── ThemeSwitcher
```

The three main game variants (standard, bonus, and community levels) share a similar structure but have distinct implementations to handle their specific requirements.

## State Management

The Queens Game uses React hooks for state management. The application's state is primarily managed through custom hooks, especially `useGameLogic`.

### Core State Management

1. **Game State**: Managed through the `useGameLogic` hook, which handles:
   - Board state (queen positions)
   - Win conditions
   - Timer state
   - Game settings
   - Undo history

2. **User Preferences**: Stored in localStorage for persistence:
   - Theme preferences (light/dark)
   - Language selection
   - Game settings like auto-placement and timer visibility

3. **Level Progress**: Tracks completed levels and solving times

### State Flow Example

```
User places a queen → handleSquareClick → 
Updates board state → Checks win condition →
If won, updates localStorage with completion data
```

## Data Flow

Data flows through the application in the following patterns:

### Top-Down Flow

1. **Route-based Level Loading**:
   - User selects a level → Router loads appropriate page component
   - Page component loads level data from utility files
   - Level data passed to Level component as props

2. **Board Rendering**:
   - Level component passes board state to Board component
   - Board component passes square state to individual Square components
   - Square components render Queen or Cross components based on state

### User Interaction Flow

1. **Square Click**:
   - User clicks square → handleSquareClick called
   - State updated in useGameLogic hook
   - Updated state flows back down to components
   - UI re-renders to reflect new state

2. **Settings Toggle**:
   - User toggles setting → Toggle function called (e.g., toggleAutoPlaceXs)
   - State updated in useGameLogic hook
   - Setting stored in localStorage for persistence
   - UI components respond to setting change

### Inter-component Communication

Components communicate primarily through:
- Props passing from parent to child
- Custom hooks that provide shared state
- Context (theme, translations) for global state

## Hooks Overview

The application uses several custom hooks to encapsulate logic:

### useGameLogic

The central game engine that manages:
- Board state and manipulation
- Win condition checking
- Timer management
- Game settings
- Placement history for undo functionality

```typescript
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
  levelType, // optional for bonus/community levels
});
```

### useVisibility

Tracks page visibility to pause the timer when the user switches tabs or minimizes the window:

```typescript
const isVisible = useVisibility();
```

### useDirection

Handles RTL/LTR language direction for proper text alignment:

```typescript
const direction = useDirection();
```

### useGridSize

Computes appropriate grid sizing based on board dimensions:

```typescript
const gridSize = useGridSize(boardSize);
```

### useImageGridProcessing

Used in the Level Builder to process uploaded images for custom board creation:

```typescript
const { processImage } = useImageGridProcessing();
```

## File Structure

The project follows a feature-based organization:

```
src/
├── assets/            # Static assets like images and icons
├── components/        # UI components grouped by feature
│   ├── GameLevel/     # Standard level components
│   ├── BonusLevel/    # Bonus level components
│   ├── CommunityLevel/# Community level components
│   ├── LevelBuilder/  # Level creation components
│   ├── LevelSelection/# Level selection screen components
│   ├── icons/         # Icon components
│   ├── ui/            # Shared UI components
│   └── mobile/        # Mobile-specific components
├── hooks/             # Custom React hooks
├── i18n/              # Internationalization files
├── layouts/           # Layout components
├── pages/             # Page components (route targets)
├── styles/            # Global and shared styles
├── utils/             # Utility functions and data
│   ├── levels/        # Standard level definitions
│   ├── bonus-levels/  # Bonus level definitions
│   ├── community-levels/# Community level definitions
│   └── [utility files]# Various utility functions
└── [root files]       # Entry points and configuration
```

This organization allows for:
- Clear separation of concerns
- Feature isolation
- Easy navigation for developers
- Logical grouping of related components

## Game Logic Implementation

The game logic is primarily implemented in the following files:

### useGameLogic Hook

Located in `src/hooks/useGameLogic.ts`, this hook encapsulates:
- Board state management
- Queen placement logic
- Conflict detection
- Win condition checking
- Timer functionality
- User settings management

### Board Utilities

Located in `src/utils/board.ts`, these functions handle:
- Board creation and initialization
- Checking if queens can attack each other
- Finding all attacks between queens
- Determining if a board is solved

### Game Logic Utilities

Located in `src/utils/gameLogic.ts`, these functions handle:
- Calculating possible queen conflicts
- Determining valid moves
- Implementing game rules

### Level Data Structure

Located in various files under `src/utils/levels/`, `src/utils/bonus-levels/`, and `src/utils/community-levels/`, these define:
- Board sizes
- Region colors
- Special rules or constraints

## Level Structure

Levels in Queens Game are defined using a consistent data structure:

### Standard Level Format

```typescript
// Level definition in src/utils/levels/level1.ts
export const level1 = {
  size: 4,
  colorRegions: [
    [0, 0], [0, 1], [0, 2], [0, 3],
    [1, 0], [1, 1], [1, 2], [1, 3],
    [2, 0], [2, 1], [2, 2], [2, 3],
    [3, 0], [3, 1], [3, 2], [3, 3],
  ],
  regionColors: [
    ["#FFC107", "#FFA000", "#FFD54F", "#FFE082"],
    ["#1976D2", "#1565C0", "#42A5F5", "#90CAF9"],
    ["#388E3C", "#2E7D32", "#66BB6A", "#A5D6A7"],
    ["#D32F2F", "#C62828", "#EF5350", "#EF9A9A"],
  ],
  hints: true,
};
```

### Bonus Level Format

Similar to standard levels, but with additional metadata like release dates and special rules:

```typescript
// Bonus level in src/utils/bonus-levels/2025-05-04.ts
export const bonusLevel20250504 = {
  id: "2025-05-04",
  size: 8,
  title: "Spiral Challenge",
  colorRegions: [ /* region data */ ],
  regionColors: [ /* color data */ ],
  releaseDate: "2025-05-04",
};
```

### Community Level Format

Includes author information and metadata:

```typescript
// Community level in src/utils/community-levels/level1.ts
export const communityLevel1 = {
  id: "1",
  size: 6,
  title: "Community Puzzle",
  colorRegions: [ /* region data */ ],
  regionColors: [ /* color data */ ],
  createdBy: "Username",
  personalLink: "https://github.com/username",
  note: "This is a special puzzle with symmetrical regions",
};
```

### Level Collection Management

Levels are imported and collected in central files:
- `src/utils/levels.ts` for standard levels
- `src/utils/bonusLevels.ts` for bonus levels
- `src/utils/communityLevels.ts` for community levels

These files export collections that are used throughout the application for level selection, navigation, and rendering.

The modular level structure allows for easy addition of new levels and ensures consistent handling across the application.
