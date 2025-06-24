# Queens Game Overview

## Introduction
Queens Game is an interactive puzzle game based on the classic N-Queens problem from chess and computational theory. The objective is to place queens on a chessboard in positions where they cannot attack each other. In the Queens Game, players strategically place queens on colored regions while ensuring no queen can attack another along rows, columns, or diagonals. The game offers a blend of logic and strategy that makes it accessible yet challenging for players of all levels.

## Tech Stack
The Queens Game is built with modern web technologies:
- **React**: Core UI library for building the component-based interface
- **TypeScript**: For type-safe code and improved developer experience
- **Tailwind CSS**: For responsive and utility-first styling
- **Vite**: As the fast and efficient build tool and development server
- **React Router**: For handling navigation between different game sections
- **Next-themes**: For implementing light/dark theming
- **React-i18next**: For internationalization support
- **Giscus**: For comments and community interaction

## Architecture Overview
The application follows a modular component-based architecture:

1. **Pages**: Main route components that serve as containers for game features
   - Level selection
   - Game levels (standard, bonus, community)
   - Level builder
   
2. **Components**: Reusable UI elements organized by feature
   - Game boards
   - Queens and squares
   - Navigation elements
   - Settings controls
   
3. **Hooks**: Custom React hooks that encapsulate game logic and state
   - `useGameLogic`: Core game mechanics and state management
   - `useVisibility`: Page visibility detection
   - Other utility hooks

4. **Utils**: Helper functions and game data
   - Level definitions
   - Board manipulation functions
   - Game logic utilities

## Game Mechanics
The core mechanics of Queens Game revolve around the classic N-Queens problem:

1. **Basic Rules**:
   - Players place queens on a board of various sizes (typically 8×8 but varies by level)
   - No two queens can attack each other along rows, columns, or diagonals
   - The game is won when the maximum number of queens are placed without conflicts

2. **Unique Features**:
   - **Colored Regions**: The board is divided into colored regions, requiring specific placement patterns
   - **Automatic X Placement**: Option to automatically mark squares that would create conflicts
   - **Clash Highlighting**: Visual indicators showing conflicting queens
   - **Undo Functionality**: Players can take back moves

3. **Game Flow**:
   - Start with an empty board
   - Place queens strategically
   - Solve the puzzle by placing the correct number of queens without conflicts
   - Progress to more challenging levels

## Features

### Standard Levels
- Progressive difficulty from simple to complex boards
- Numbered levels with clear progression path
- Navigation between levels with previous/next buttons
- Timer to track completion time
- Progress saving to continue later

### Bonus Levels
- Special weekly challenges
- Unique puzzle configurations
- Themed or special rule sets
- Limited-time availability
- Different progression system from standard levels

### Community Levels
- Player-created puzzles
- Browsable community level collection
- Rating and commenting system via Giscus
- Ability to sort and filter by difficulty, creator, etc.
- Community engagement through level sharing

### Level Builder
- Interface for creating custom levels
- Board size selection
- Region coloring tools
- Testing functionality to ensure level validity
- Sharing options for community levels

## Component Structure

### Core Game Components
- **Level Components**: Three variants (standard, bonus, community) with shared logic
- **Board Component**: Renders the game grid with proper sizing and regions
- **Square Component**: Individual board cells that handle click events and queen placement
- **Queen Component**: The visual representation of placed queens
- **Cross Component**: Visual indicators for invalid placement positions

### UI Components
- **HowToPlay**: Instructions modal explaining game rules
- **SettingsDialog**: Configuration options for gameplay experience
- **WinningScreen**: Victory celebration and statistics display
- **Timer**: Tracks solving time for each level
- **Navigation**: Level selection and movement between levels

### Shared Elements
- **Button**: Reusable button component with consistent styling
- **Icons**: SVG icons for various actions and indicators
- **Tag**: Label component for level categorization and metadata

## Navigation Flow
The application uses React Router for navigation between different sections:

1. **Main Routes**:
   - `/`: Home page with level selection
   - `/level/:id`: Standard game levels by ID
   - `/bonus-levels`: List of available bonus levels
   - `/bonus-level/:id`: Individual bonus level by ID
   - `/community-levels`: List of community-created levels
   - `/community-level/:id`: Individual community level by ID
   - `/level-builder`: Interface for creating custom levels

2. **Navigation Patterns**:
   - Back button to return to level selection
   - Previous/Next buttons for sequential level navigation
   - Direct access to levels through the level selection screen

## Internationalization
The application supports multiple languages through the react-i18next library:

- English (default)
- Spanish
- French
- Arabic
- Italian
- Portuguese
- Chinese

Translation strings are stored in JSON files in the `src/i18n` directory, and the language can be changed through the UI via a language dropdown component.

## User Data Storage
Player progress and settings are saved locally to provide a persistent experience:

1. **Progress Tracking**:
   - Completed levels
   - Solving times
   - Achievements

2. **User Preferences**:
   - Theme preference (light/dark)
   - Language selection
   - Game settings (timer visibility, auto-placement of Xs, etc.)

3. **Storage Implementation**:
   - Uses browser's localStorage API
   - Data is saved automatically when progress is made
   - Settings changes are immediately persisted

## Contributing
The Queens Game is an open-source project welcoming community contributions:

1. **Development Process**:
   - Fork the repository
   - Create a feature branch
   - Implement changes with tests as appropriate
   - Submit pull request for review

2. **Contribution Areas**:
   - New levels
   - Bug fixes
   - Feature enhancements
   - Translations
   - Documentation improvements

3. **Community Guidelines**:
   - Follow the code of conduct
   - Write clean, maintainable code
   - Include appropriate tests
   - Update documentation as needed

For more detailed information on contributing, please refer to the project's GitHub repository and contribution guidelines.
