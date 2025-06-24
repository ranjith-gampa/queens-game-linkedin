# Queens Game User Features

## Game Modes

### Standard Levels
Standard levels form the core gameplay experience of Queens Game, offering a structured progression through increasingly complex puzzles. These levels are carefully designed to introduce players to the game mechanics and gradually increase in difficulty.

- **Progressive Difficulty**: Levels start simple with smaller boards and straightforward patterns, then gradually introduce more complex arrangements and larger board sizes.
- **Numbered Sequence**: Organized in numerical order, making progress tracking intuitive.
- **Guided Learning**: Early levels serve as tutorials, introducing concepts that are expanded upon in later challenges.
- **Achievement System**: Completing levels unlocks subsequent ones, providing a sense of accomplishment and progression.
- **Best Time Records**: Your fastest completion times are saved for each level, encouraging replayability to improve your scores.

### Bonus Levels
Bonus levels provide special challenges with unique characteristics, refreshing the gameplay experience with new puzzles on a regular basis.

- **Weekly Releases**: New bonus levels are released periodically, giving players fresh content to look forward to.
- **Unique Themes**: Each bonus level features distinctive visual themes or patterns that set them apart from standard levels.
- **Special Challenges**: May include unique restrictions, unusual board shapes, or special victory conditions.
- **Limited-Time Access**: Some bonus levels may be available for a limited time, creating an incentive to play regularly.
- **Independent Progression**: Bonus levels have their own progression path separate from the main level sequence.

### Community Levels
Community levels are player-created puzzles that expand the game beyond the official content, offering endless variety and creativity.

- **Player-Created Content**: Puzzles designed by other players using the in-game Level Builder.
- **Diverse Difficulty**: Ranges from beginner-friendly to expert-level challenges.
- **Rating System**: Players can rate levels to help others find quality content.
- **Comments and Discussion**: Through Giscus integration, players can discuss strategies, provide feedback, and engage with level creators.
- **Creator Attribution**: Each level displays its creator, allowing players to follow favorite designers.
- **Browse and Filter**: Sort community levels by difficulty, popularity, or creation date.
- **Personal Links**: Level creators can attach links to their personal pages or social media.

## User Interface

### Controls
The Queens Game features an intuitive control scheme designed for smooth play:

- **Square Placement**: Click on an empty board square to place a queen.
- **Queen Removal**: Click on a queen to remove it from the board.
- **Drag and Drop**: On supported devices, drag queens to reposition them.
- **Undo Button**: Revert your last move to try different strategies.
- **Reset Button**: Clear the entire board to start the level fresh.
- **Visual Feedback**: Invalid placements are highlighted with visual indicators.
- **Highlighting**: The game may highlight squares where queens can attack each other when the feature is enabled.

### Settings
Queens Game offers various settings to customize your gameplay experience:

- **Show/Hide Timer**: Toggle the timer visibility if you prefer a more relaxed play style.
- **Auto-Place X Markers**: When enabled, the game automatically marks squares where queens cannot be placed due to attacks.
- **Show Clashing Queens**: Highlights queens that can attack each other for easier problem identification.
- **Show/Hide Instructions**: Toggle visibility of the game instructions for new or experienced players.
- **Settings Dialog**: Access all settings through a dedicated dialog accessed via the settings icon.

### Navigation
The game provides straightforward navigation between different sections:

- **Level Selection Screen**: The main hub that displays all available levels organized by type.
- **Back Button**: Returns to the previous screen from any level.
- **Previous/Next Level Buttons**: Navigate sequentially through levels without returning to the selection screen.
- **Direct Access**: Jump directly to any unlocked level from the level selection screen.
- **Top Bar Navigation**: Quickly switch between standard, bonus, and community level sections.
- **Level Builder Access**: Button to access the level creation tool from the main menu.

## Level Builder

### Creating Custom Levels
The Level Builder is a powerful tool that allows players to design their own Queens Game challenges:

1. **Board Size Selection**: Choose dimensions from small (4x4) to large (8x8 or more).
2. **Region Creation**: Define colored regions on the board by selecting groups of squares.
3. **Color Palette**: Customize the colors for each region to create visually appealing puzzles.
4. **Level Testing**: Play your level before publishing to ensure it has a valid solution.
5. **Level Naming**: Give your creation a descriptive title.
6. **Add Notes**: Include hints or a description to guide players.
7. **Creator Information**: Add your name and optional links to be displayed with your level.

### Publishing Levels
After creating a level, you can share it with the community:

1. **Submit via Code**: Generate and copy the level code to share directly with other players.
2. **Submit via Platform**: Submit your level through the built-in submission system to make it available to all players.
3. **Preview Generation**: The system creates a preview image of your level for the community browser.
4. **Moderation Process**: Submitted levels may undergo basic moderation before appearing in the community section.

### Importing Custom Levels
Players can import levels created by others:

1. **Code Import**: Paste a level code to play a shared level without it being in the community section.
2. **Image Import**: The Level Builder allows importing images to create region patterns automatically.

## Game Rules

### Basic Queens Game Rules
The Queens Game is based on the classic N-Queens puzzle, with added region constraints:

1. **Objective**: Place queens on the board so that no two queens can attack each other.
2. **Queen Movement**: Queens can attack along rows, columns, and diagonals, just like in chess.
3. **Region Requirements**: Each distinct colored region must contain exactly one queen.
4. **Win Condition**: The level is solved when all regions have one queen, and no queens can attack each other.

### Advanced Mechanics
Beyond the basic rules, some levels introduce additional complexity:

1. **Multi-Region Colors**: Some levels may have multiple regions of the same color, requiring exactly one queen in each discrete region.
2. **Size Variations**: Board sizes can range from 4x4 to 8x8 or larger, affecting difficulty.
3. **Special Patterns**: Certain levels may enforce specific patterns or symmetry requirements.

### Strategy Tips
- Start with the most constrained regions (those with fewer valid placement options).
- Use the auto-place X feature to help identify valid placement squares.
- Remember that queens attack along full lines, not just adjacent squares.
- Try to solve sections of the board independently when possible.
- Use the undo feature to experiment with different approaches.

## Progress Tracking

### Level Completion
The game tracks your progress across all level types:

- **Completion Status**: Completed levels are marked with visual indicators in the level selection screen.
- **Time Records**: Your best completion time is saved for each level.
- **Persistence**: Progress is automatically saved to your browser's local storage.
- **Statistics**: View stats like total levels completed and fastest times.

### Progress Visualization
The game provides visual feedback on your progress:

- **Gold Crowns**: May appear on completed levels to indicate mastery.
- **Color Coding**: Different visual indicators show completed versus uncompleted levels.
- **Filters**: Option to filter the level selection to show only completed or uncompleted levels.
- **Progress Reset**: Option to reset all progress if you want to start fresh (with confirmation dialogue).

### Saving Mechanism
Progress is automatically saved through several mechanisms:

- **Automatic Saving**: Progress is saved immediately when you complete a level.
- **Local Storage**: Your progress is stored in your browser's localStorage.
- **Device-Specific**: Progress is tied to the browser and device you're using.
- **No Account Required**: No sign-in required, simplifying the experience.

## Theme Settings

### Light and Dark Mode
Queens Game supports both light and dark display modes:

- **Light Theme**: The default theme with a bright background and dark text.
- **Dark Theme**: Reduced brightness theme with light text on dark backgrounds, ideal for low-light environments.
- **System Preference**: Option to follow your device's system theme setting automatically.
- **Persistent Setting**: Your theme preference is remembered between visits.
- **Toggle Button**: Easy access theme switcher in the bottom corner of the screen.

### Visual Customization
Beyond theme selection, the game offers other visual options:

- **Board Colors**: The colored regions provide visual variety across different levels.
- **Queen Design**: Queens are visually distinct and designed to stand out on the colored board.
- **X-Marker Style**: Clear visual indicators for squares where queens cannot be placed.
- **Responsive Design**: The interface adjusts to different screen sizes for optimal viewing.

## Language Options

### Supported Languages
Queens Game is available in multiple languages:

- English (default)
- Spanish
- French
- Arabic
- Italian
- Portuguese
- Chinese

### Changing Language
You can easily switch between available languages:

1. **Language Dropdown**: Access the language menu from the level selection screen.
2. **Immediate Update**: The interface language changes immediately without requiring a reload.
3. **Persistent Selection**: Your language preference is saved for future visits.
4. **RTL Support**: Full support for right-to-left languages like Arabic.
5. **Translation Coverage**: All game UI elements, instructions, and messages are translated.

### Community Translations
The game may support community-contributed translations:

- Information about how to contribute translations may be available in the project documentation.
- Translation updates may be added in future releases.
