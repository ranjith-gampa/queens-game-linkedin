# Scripts README

This folder contains automation scripts for the Queens game clone project. The primary script is `addLevel.ts`, which automates the process of adding new levels (both regular and bonus) to the game.

## addLevel.ts

This TypeScript script uses Playwright to automate adding new levels to the Queens game clone. It captures screenshots from the LinkedIn Queens game and integrates them into your local level builder.

### Prerequisites

- Node.js and npm installed
- Project dependencies installed (`npm install`)
- Playwright browsers installed (`npx playwright install`)

### Usage

The script supports both regular levels (numbered) and bonus levels (date-based, weekly on Sundays).

#### Adding Regular Levels

```bash
# Add a new numbered level
npx tsx scripts/addLevel.ts --level <number>

# Run in headed mode
npx tsx scripts/addLevel.ts --level <number> --headless=false

# Using npm script
npm run add:level -- --level <number>
```

#### Adding Bonus Levels

```bash
# Add a new bonus level (automatically calculates next Sunday date)
npx tsx scripts/addLevel.ts --bonus

# Run in headed mode
npx tsx scripts/addLevel.ts --bonus --headless=false

# Using npm script
npm run add:bonus
```

#### Other Options

```bash
# Stop at a specific step
npx tsx scripts/addLevel.ts --level <number> --stop-at=<step>

# Show available steps
npx tsx scripts/addLevel.ts --show-steps
```

#### Examples

```bash
# Add level 432 in headless mode
npx tsx scripts/addLevel.ts --level 432

# Add level 433 with visible browser
npx tsx scripts/addLevel.ts --level 433 --headless=false

# Add bonus level for this week (automatically uses 2025-07-06)
npx tsx scripts/addLevel.ts --bonus --headless=false

# Add level 430 and stop after capturing screenshot
npx tsx scripts/addLevel.ts --level 430 --stop-at=capture

# Show all available steps
npx tsx scripts/addLevel.ts --show-steps

# Using npm scripts
npm run add:level -- --level 432
npm run add:bonus -- --headless=false
```

#### Options

- `--level <number>`: Optional. The level number to add (e.g., 5)
- `--headless`: Optional. Run in headless mode (default: true). Use --headless=false to see the browser
- `--stop-at <step>`: Optional. Stop automation at a specific step
- `--show-steps`: Optional. Display all available steps and exit

#### Available Steps

Run with `--show-steps` to see the list. Current steps include:

- navigate
- start
- capture
- builder
- upload
- name
- generate
- file
- levels
- readme
- complete
