import { chromium, Browser, Page, Frame } from "playwright";
import * as fs from "fs/promises";
import * as fsSync from "fs";
import * as path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

/**
 * Script to automatically add new levels to the Queens Game
 * 
 * Regular levels:
 *   npx tsx ./scripts/addLevel.ts --level 432 --headless=false
 * 
 * Bonus levels (automatically calculates next Sunday date):
 *   npx tsx ./scripts/addLevel.ts --bonus --headless=false
 * 
 * Show available automation steps:
 *   npx tsx ./scripts/addLevel.ts --show-steps
 */

// Define automation steps
enum AutomationSteps {
  NAVIGATE = "navigate",
  START = "start",
  CAPTURE = "capture",
  BUILDER = "builder",
  LINKEDIN = "linkedin",
  UPLOAD = "upload",
  NAME = "name",
  GENERATE = "generate",
  FILE = "file",
  LEVELS = "levels",
  README = "readme",
  COMPLETE = "complete",
}

// Type for level mode
type LevelMode = "regular" | "bonus";

async function navigateToGame(page: Page, mode: LevelMode = "regular"): Promise<void> {
  console.log(`Navigating to Queens game (${mode} mode)...`);
  if (mode === "bonus") {
    await page.goto("https://www.linkedin.com/games/queens?bonus=true");
  } else {
    await page.goto("https://www.linkedin.com/games/queens/");
  }
}

async function startGameIfNeeded(page: Page): Promise<void> {
  console.log("Checking for start button...");

  await page.waitForLoadState("domcontentloaded");

  const iframeHandle = await page.waitForSelector(
    "iframe.game-launch-page__iframe",
    { timeout: 15000 }
  );
  const iframe: Frame | null = await iframeHandle.contentFrame();

  if (!iframe) {
    console.log("Could not find iframe");
    await page.screenshot({ path: "debug-iframe-failure.png" });
    throw new Error("Failed to access game iframe");
  }

  console.log("Iframe found, waiting for content...");

  try {
    let startButton;

    try {
      startButton = await iframe.waitForSelector(
        '.launch-footer__btn--start:has-text("Start game")',
        { timeout: 5000, state: "visible" }
      );

      if (startButton) {
        const buttonText = await startButton.textContent();
        console.log(
          `Start button found with text: "${buttonText?.trim()}", clicking...`
        );
        await startButton.click();
        console.log("Start button clicked, waiting for game to load...");
        await iframe.waitForTimeout(2000);
      } else {
        console.log("No start button found, proceeding...");
      }
    } catch (error) {
      console.log("Start button not found or not visible, proceeding...");
    }

    try {
      const dismissButton = await iframe.waitForSelector(
        ".artdeco-modal__dismiss",
        { timeout: 5000, state: "visible" }
      );
      if (dismissButton) {
        console.log("Tutorial modal found, closing...");
        await dismissButton.click();
        await iframe.waitForTimeout(1000);
        console.log("Tutorial modal closed");
      }
    } catch (error) {
      console.log("No tutorial modal found or failed to close, proceeding...");
    }
  } catch (error) {
    console.log(
      "Error in start process:",
      error instanceof Error ? error.message : String(error)
    );
    await page.screenshot({ path: "debug-start-failure.png" });
    console.log("Proceeding anyway...");
  }
}

async function captureScreenshot(
  page: Page,
  identifier: string,
  mode: LevelMode = "regular"
): Promise<string> {
  console.log(`Capturing screenshot of queens-board (${mode})...`);
  try {
    // Wait for the iframe to be available
    const iframeHandle = await page.waitForSelector(
      "iframe.game-launch-page__iframe",
      { timeout: 15000 }
    );
    const iframe: Frame | null = await iframeHandle.contentFrame();

    if (!iframe) {
      throw new Error("Failed to access game iframe for screenshot");
    }

    // Wait for the queens-board section inside the iframe
    const boardElement = await iframe.waitForSelector("section.queens-board", {
      timeout: 15000,
      state: "visible",
    });

    // Zoom in on the page (e.g., 150% zoom)
    await iframe.evaluate(() => {
      document.body.style.zoom = "150%"; // Adjust zoom level as needed (e.g., '200%' for 2x zoom)
    });

    // Optional: Wait a moment for the zoom to take effect
    await iframe.waitForTimeout(500);

    // Move the mouse to a safe location (e.g., top-left corner)
    await page.mouse.move(0, 0);

    // Wait a moment for any tooltip to disappear
    await iframe.waitForTimeout(500);

    // Capture screenshot of just the queens-board element
    const screenshotBuffer = await boardElement.screenshot({
      scale: "device", // Use device pixel ratio for sharper images
    });

    // Reset zoom after capturing (optional)
    await iframe.evaluate(() => {
      document.body.style.zoom = "100%";
    });

    // Save the screenshot
    const prefix = mode === "bonus" ? "bonus" : "level";
    const screenshotPath = path.join(
      __dirname,
      `${prefix}-${identifier}-screenshot.png`
    );
    await fs.writeFile(screenshotPath, screenshotBuffer);
    console.log(`Screenshot saved to ${screenshotPath}`);
    return screenshotPath;
  } catch (error) {
    console.log(
      "Failed to capture screenshot:",
      error instanceof Error ? error.message : String(error)
    );
    // Fallback to full page screenshot for debugging
    await page.screenshot({ path: "debug-screenshot-failure.png" });
    console.log("Debug screenshot saved as debug-screenshot-failure.png");
    throw error;
  }
}

async function navigateToLevelBuilder(page: Page): Promise<void> {
  console.log("Navigating to level builder...");
  
  try {
    // Track all network activity
    const failedRequests: string[] = [];
    const successfulRequests: string[] = [];
    
    // Listen for ALL console messages (not just errors)
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      console.log(`Browser console [${type}]: ${text}`);
    });
    
    // Listen for page errors
    page.on('pageerror', error => {
      console.log('Page error:', error.message);
    });
    
    // Listen for failed requests
    page.on('requestfailed', request => {
      const url = request.url();
      const failure = request.failure();
      const errorText = failure?.errorText || 'unknown error';
      console.log(`❌ Failed request: ${url} - ${errorText}`);
      failedRequests.push(`${url}: ${errorText}`);
    });
    
    // Listen for all responses to track what's loading successfully
    page.on('response', response => {
      const url = response.url();
      const status = response.status();
      if (url.includes('localhost:3000') || url.includes('.js') || url.includes('.ts') || url.includes('.jsx')) {
        if (status >= 200 && status < 400) {
          console.log(`✅ Successful request: ${status} ${url}`);
          successfulRequests.push(url);
        } else {
          console.log(`❌ Failed response: ${status} ${url}`);
          failedRequests.push(`${url}: HTTP ${status}`);
        }
      }
    });
    
    // First, check if the server is actually responding correctly
    console.log("Checking server health...");
    const response = await page.goto("http://localhost:3000/", {
      waitUntil: "domcontentloaded",
      timeout: 15000
    });
    console.log("Server response status:", response?.status());
    
    if (!response || response.status() !== 200) {
      throw new Error(`Server health check failed: ${response?.status() || 'no response'}`);
    }
    
    // Wait for initial network activity to settle
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Now navigate to the level builder
    console.log("Navigating to level builder page...");
    await page.goto("http://localhost:3000/level-builder?skipWelcome=true", {
      waitUntil: "domcontentloaded",
      timeout: 30000
    });
    
    // Wait for the page to fully render
    console.log("Waiting for level builder to load...");
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    
    // Wait extra time for React components to mount
    await page.waitForTimeout(5000);
    
    // Check if JavaScript is working
    console.log("Checking if JavaScript is enabled...");
    const jsEnabled = await page.evaluate(() => {
      return typeof window !== 'undefined' && typeof document !== 'undefined';
    });
    console.log("JavaScript enabled:", jsEnabled);
    
    // Check what scripts are loaded
    console.log("Checking loaded scripts...");
    const scripts = await page.evaluate(() => {
      const scriptElements = Array.from(document.querySelectorAll('script'));
      return scriptElements.map(script => ({
        src: script.src,
        type: script.type,
        hasContent: script.textContent ? script.textContent.length > 0 : false
      }));
    });
    console.log("Scripts found:", scripts);
    
    // Check if Vite's client script is present
    const viteClient = await page.evaluate(() => {
      return !!document.querySelector('script[type="module"]');
    });
    console.log("Vite module script found:", viteClient);
    
    if (!jsEnabled) {
      throw new Error("JavaScript is not enabled in the browser context");
    }
    
    // Wait for React app to mount by checking for content in the root element
    console.log("Waiting for React app to mount...");
    try {
      // First wait for Vite scripts to load
      console.log("Waiting for Vite scripts to load...");
      await page.waitForFunction(
        () => {
          const scripts = Array.from(document.querySelectorAll('script[type="module"]')) as HTMLScriptElement[];
          const viteClient = scripts.some(s => s.src.includes('@vite/client'));
          const mainApp = scripts.some(s => s.src.includes('src/index.jsx') || s.src.includes('main.jsx'));
          console.log('Vite scripts check - client:', viteClient, 'app:', mainApp);
          return viteClient && mainApp;
        },
        { timeout: 15000 }
      );
      console.log("Vite scripts appear to be loaded");
      
      // Wait additional time for modules to execute
      await page.waitForTimeout(5000);
      
      // Now wait for React content
      await page.waitForFunction(
        () => {
          const root = document.querySelector('#root');
          if (!root) return false;
          
          // Check if React has mounted by looking for actual content (not just the JS disabled message)
          const content = root.textContent || '';
          const hasJSMessage = content.includes('You need to enable JavaScript');
          const hasRealContent = content.includes('Level Builder') || content.includes('Queens') && content.length > 100;
          
          console.log('Checking React mount - content length:', content.length, 'hasJSMessage:', hasJSMessage, 'hasRealContent:', hasRealContent);
          
          return hasRealContent && !hasJSMessage;
        },
        { timeout: 20000 }
      );
      console.log("React app appears to have mounted with content");
    } catch (error) {
      console.log("Timeout waiting for React app to mount, checking content...");
      
      // Debug what's actually in the root element
      const rootContent = await page.evaluate(() => {
        const root = document.querySelector('#root');
        return root ? root.textContent : 'No root element found';
      });
      console.log("Root element content:", rootContent?.substring(0, 200) || 'No content');
      
      // Check the full HTML to see what's actually loaded
      const fullHTML = await page.content();
      console.log("Page HTML length:", fullHTML.length);
      console.log("HTML includes React root:", fullHTML.includes('<div id="root">'));
      console.log("HTML includes script tags:", fullHTML.includes('<script'));
      
      // Try to manually trigger React if it exists
      console.log("Attempting to manually check for React...");
      const reactPresent = await page.evaluate(() => {
        return typeof (window as any).React !== 'undefined' || typeof (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined';
      });
      console.log("React detected in window:", reactPresent);
    }
    
    // Verify the page loaded correctly by checking for multiple possible indicators
    console.log("Verifying page load...");
    
    // Check for the main heading with multiple possible texts (including translations)
    const headingExists = await page.locator('h1').count();
    console.log("Total h1 elements found:", headingExists);
    
    const levelBuilderHeading = await page.locator('h1:has-text("Level Builder")').count();
    console.log("'Level Builder' heading found:", levelBuilderHeading);
    
    // Check for other language variants
    const spanishHeading = await page.locator('h1:has-text("Constructor de Niveles")').count();
    const frenchHeading = await page.locator('h1:has-text("Créateur de niveaux")').count();
    console.log("Alternative language headings - Spanish:", spanishHeading, "French:", frenchHeading);
    
    const allHeadingText = await page.locator('h1').allTextContents();
    console.log("All h1 text content:", allHeadingText);
    
    // Alternative check: look for the LevelBuilderSelector component
    const selectorExists = await page.locator('[data-testid="level-builder-selector"]').count();
    console.log("LevelBuilderSelector component found:", selectorExists);
    
    // Alternative check: look for any key components that should be on the level builder page
    const levelNameInput = await page.locator('input[name="levelName"]').count();
    console.log("Level name input found:", levelNameInput);
    
    const boardSizeInput = await page.locator('input[placeholder*="Board size"], input[name*="boardSize"]').count();
    console.log("Board size input found:", boardSizeInput);
    
    // Check if we're on a 404 or error page
    const notFoundText = await page.locator(':has-text("404"), :has-text("Not Found"), :has-text("Page not found")').count();
    console.log("404/Not Found indicators:", notFoundText);
    
    // If we have at least one of the key components, consider the page loaded
    const pageLoadedSuccessfully = levelBuilderHeading > 0 || spanishHeading > 0 || frenchHeading > 0 || 
                                   selectorExists > 0 || levelNameInput > 0 || boardSizeInput > 0;
    
    if (!pageLoadedSuccessfully) {
      // Take a screenshot to see what's on the page
      await page.screenshot({ path: "debug-level-builder-page.png", fullPage: true });
      console.log("Debug screenshot saved as debug-level-builder-page.png");
      
      // Check the current URL
      const currentUrl = page.url();
      console.log("Current URL:", currentUrl);
      
      // Check page title
      const pageTitle = await page.title();
      console.log("Page title:", pageTitle);
      
      // Get page text content for debugging
      const bodyText = await page.locator('body').textContent();
      console.log("Page body text (first 500 chars):", bodyText?.substring(0, 500) || "No body text");
      
      // Check if there are any error messages
      const errorMessages = await page.locator('[role="alert"], .error, .alert-error').allTextContents();
      if (errorMessages.length > 0) {
        console.log("Error messages found:", errorMessages);
      }
      
      // Try waiting a bit longer and check again
      console.log("Trying additional wait and re-check...");
      await page.waitForTimeout(10000);
      
      const retryHeading = await page.locator('h1:has-text("Level Builder")').count();
      const retrySelector = await page.locator('[data-testid="level-builder-selector"]').count();
      console.log("After additional wait - heading:", retryHeading, "selector:", retrySelector);
      
      if (retryHeading === 0 && retrySelector === 0) {
        throw new Error("Level Builder page did not load correctly - no key components found after extended wait");
      }
    }
    
    console.log("Level builder loaded successfully");
  } catch (error) {
    console.log("Error navigating to level builder:", error instanceof Error ? error.message : String(error));
    
    // Take a debug screenshot
    await page.screenshot({ path: "debug-navigation-failure.png", fullPage: true });
    console.log("Debug screenshot saved as debug-navigation-failure.png");
    
    throw error;
  }
}

async function uploadScreenshot(
  page: Page,
  screenshotPath: string
): Promise<void> {
  console.log("Uploading screenshot...");
  console.log("Screenshot path:", screenshotPath);
  
  try {
    // First, wait for the page to be fully loaded and the file input to be present
    console.log("Waiting for page to be ready...");
    await page.waitForLoadState('networkidle');
    
    // Check if the file input exists in the DOM
    console.log("Checking if file input exists...");
    const inputExists = await page.locator("#screenshot-upload").count();
    console.log("File input count:", inputExists);
    
    if (inputExists === 0) {
      throw new Error("File input #screenshot-upload not found in DOM");
    }
    
    // Get the hidden file input without waiting for visibility (since it's intentionally hidden)
    console.log("Getting hidden file input...");
    const fileInput = page.locator("#screenshot-upload");
    await fileInput.waitFor({ state: 'attached', timeout: 15000 });
    
    // Check that the file exists before uploading
    if (!fsSync.existsSync(screenshotPath)) {
      throw new Error(`Screenshot file does not exist: ${screenshotPath}`);
    }
    
    console.log("Uploading file to input...");
    // Upload the file to the hidden input
    await fileInput.setInputFiles(screenshotPath);
    console.log("Screenshot uploaded successfully");
    
    // Wait a bit for the upload to process
    await page.waitForTimeout(2000);
  } catch (error) {
    console.log(
      "Upload failed:",
      error instanceof Error ? error.message : String(error)
    );
    
    // Save a debug screenshot
    await page.screenshot({ path: "debug-upload-failure.png" });
    console.log("Debug screenshot saved as debug-upload-failure.png");
    
    // Save the page HTML for debugging
    const htmlContent = await page.content();
    await fs.writeFile("debug-upload-failure.html", htmlContent);
    console.log("Debug HTML saved as debug-upload-failure.html");
    
    throw error;
  }
}

async function selectLinkedInButton(page: Page): Promise<void> {
  console.log("Selecting LinkedIn...");
  try {
    // Wait for the page to be fully loaded first
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
    
    // Wait longer for React components to render
    console.log("Waiting for React components to render...");
    await page.waitForTimeout(5000);
    
    // Check if the LevelBuilderSelector component is in the DOM
    console.log("Checking for LevelBuilderSelector component...");
    const selectorExists = await page.locator('[data-testid="level-builder-selector"]').count();
    console.log("LevelBuilderSelector count:", selectorExists);
    
    // Check if the button exists with different selectors
    console.log("Looking for LinkedIn button with different selectors...");
    const linkedinButtonCount = await page.locator('[data-testid="linkedin-button"]').count();
    console.log("LinkedIn button count (data-testid):", linkedinButtonCount);
    
    const linkedinButtonTextCount = await page.locator('button:has-text("LinkedIn")').count();
    console.log("LinkedIn button count (text):", linkedinButtonTextCount);
    
    // Try to find any buttons on the page
    const allButtons = await page.locator('button').count();
    console.log("Total buttons on page:", allButtons);
    
    // Get all button texts for debugging
    const buttonTexts = await page.locator('button').allTextContents();
    console.log("All button texts:", buttonTexts);
    
    if (linkedinButtonCount === 0 && linkedinButtonTextCount === 0) {
      // Take a debug screenshot to see the current state
      await page.screenshot({ path: "debug-no-linkedin-button.png", fullPage: true });
      console.log("Debug screenshot saved as debug-no-linkedin-button.png");
      
      // Save HTML for debugging
      const htmlContent = await page.content();
      await fs.writeFile("debug-no-linkedin-button.html", htmlContent);
      console.log("Debug HTML saved as debug-no-linkedin-button.html");
      
      // Try to wait longer and check again
      console.log("Waiting an additional 10 seconds for UI to load...");
      await page.waitForTimeout(10000);
      
      const retryCount = await page.locator('[data-testid="linkedin-button"]').count();
      console.log("LinkedIn button count after additional wait:", retryCount);
      
      if (retryCount === 0) {
        throw new Error("LinkedIn button not found in DOM after extended wait");
      }
    }
    
    // Try the primary selector first
    let button;
    if (linkedinButtonCount > 0) {
      console.log("Using data-testid selector...");
      button = await page.waitForSelector(
        '[data-testid="linkedin-button"]',
        {
          timeout: 15000,
          state: 'visible'
        }
      );
    } else {
      console.log("Using text-based selector...");
      button = await page.waitForSelector(
        'button:has-text("LinkedIn")',
        {
          timeout: 15000,
          state: 'visible'
        }
      );
    }
    
    console.log("LinkedIn button found, clicking...");
    await button.click();
    console.log("LinkedIn selected.");
    
    // Wait for UI to update after selection
    await page.waitForTimeout(1000);
  } catch (error) {
    console.log(
      "Error selecting LinkedIn:",
      error instanceof Error ? error.message : String(error)
    );
    
    // Take a debug screenshot
    await page.screenshot({ path: "debug-linkedin-selection-failure.png", fullPage: true });
    console.log("Debug screenshot saved as debug-linkedin-selection-failure.png");
    
    throw error;
  }
}

async function setLevelName(page: Page, identifier: string): Promise<void> {
  console.log("Setting level name...");
  try {
    const input = await page.waitForSelector('input[name="levelName"]', {
      timeout: 15000,
    });
    await input.fill(identifier);
    console.log(`Level name set to "${identifier}"`);
  } catch (error) {
    console.log(
      "Error setting level name:",
      error instanceof Error ? error.message : String(error)
    );
    await page.screenshot({ path: "debug-level-name.png" });
    console.log("Debug screenshot saved as debug-level-name.png");
    const content = await page.content();
    await fs.writeFile("debug-level-name.html", content);
    console.log("Page source saved to debug-level-name.html");
    throw error;
  }
}

async function generateAndCopyCode(page: Page): Promise<string> {
  console.log("Generating and copying code...");
  try {
    await page.bringToFront();
    await page.click('button:text("Generate Code")');
    await page.waitForTimeout(500);
    await page.click('button[aria-label="Copy code"]');
    await page.waitForTimeout(500);
    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText()
    );
    console.log("Code copied successfully");
    return clipboardText;
  } catch (error) {
    console.log(
      "Failed to generate or copy code:",
      error instanceof Error ? error.message : String(error)
    );
    await page.screenshot({ path: "debug-copy-code-failure.png" });
    console.log("Debug screenshot saved as debug-copy-code-failure.png");
    const content = await page.content();
    await fs.writeFile("debug-copy-code-failure.html", content);
    console.log("Page source saved to debug-copy-code-failure.html");
    throw error;
  }
}

async function createLevelFile(
  levelsDir: string,
  levelNumber: number,
  generatedCode: string
): Promise<void> {
  console.log("Creating level file...");
  const levelFile: string = `level${levelNumber}.ts`;
  await fs.writeFile(path.join(levelsDir, levelFile), generatedCode);
}

async function updatePreviousLevelFile(levelsDir: string, levelNumber: number) {
  console.log("Updating previous level file...");
  const levelFile: string = `level${levelNumber - 1}.ts`;
  const previousFileDir = path.join(levelsDir, levelFile);
  let levelContent: string = await fs.readFile(previousFileDir, "utf8");
  levelContent = levelContent.replace("\n  isNew: true,", "");
  await fs.writeFile(previousFileDir, levelContent);
}

async function updateLevelsFile(
  levelsFile: string,
  levelNumber: number
): Promise<void> {
  console.log("Updating levels file...");
  let levelsContent: string = await fs.readFile(levelsFile, "utf8");

  // Add the new import statement at the end of the imports block
  const importStatement: string = `\nimport level${levelNumber} from "./levels/level${levelNumber}";`;
  const importRegex = /import\s+level\d+\s+from\s+"\.\/levels\/level\d+";/g;
  const importMatches = levelsContent.match(importRegex);

  if (importMatches) {
    const lastImport = importMatches[importMatches.length - 1];
    const lastImportIndex =
      levelsContent.lastIndexOf(lastImport) + lastImport.length;
    levelsContent =
      levelsContent.slice(0, lastImportIndex) +
      importStatement +
      levelsContent.slice(lastImportIndex);
  } else {
    levelsContent = importStatement + levelsContent;
  }

  // Update the export statement
  const exportMatch: RegExpMatchArray | null = levelsContent.match(
    /export\s+const\s+levels\s*:\s*{[^}]*}\s*=\s*{([\s\S]*?)}\s*;/
  );
  if (exportMatch && exportMatch[1] !== undefined) {
    const existingLevels = exportMatch[1].trim();
    let newLevels: string;

    if (existingLevels) {
      const levelsArray = existingLevels
        .split(",")
        .map((level) => level.trim())
        .filter((level) => level);
      levelsArray.push(`level${levelNumber}`);
      newLevels = levelsArray.map((level) => `  ${level},`).join("\n");
    } else {
      newLevels = `  level${levelNumber},`;
    }

    levelsContent = levelsContent.replace(
      /export\s+const\s+levels\s*:\s*{[^}]*}\s*=\s*{([\s\S]*?)}\s*;/,
      `export const levels: { [key: string]: Level } = {\n${newLevels}\n};`
    );
    await fs.writeFile(levelsFile, levelsContent);
  } else {
    throw new Error("Could not find export statement in levels.ts");
  }
}

async function updateReadme(
  readmePath: string,
  levelNumber: number
): Promise<void> {
  console.log("Updating README...");
  let readmeContent: string = await fs.readFile(readmePath, "utf8");
  const levelCountMatch: RegExpMatchArray | null = readmeContent.match(
    /## Levels Added \((\d+)\/(\d+)\)/
  );

  if (levelCountMatch && levelCountMatch[1] && levelCountMatch[2]) {
    const newCount: number = parseInt(levelCountMatch[1]) + 1;
    const totalCount: number = parseInt(levelCountMatch[2]) + 1;
    readmeContent = readmeContent.replace(
      /## Levels Added \(\d+\/\d+\)/,
      `## Levels Added (${newCount}/${totalCount})`
    );
    readmeContent = readmeContent.replace(
      /- \[x\] 21-\d+/,
      `- [x] 21-${totalCount}`
    );
    await fs.writeFile(readmePath, readmeContent);
  } else {
    throw new Error("Could not find level count in README.md");
  }
}

async function createBonusLevelFile(
  bonusLevelsDir: string,
  dateString: string,
  generatedCode: string
): Promise<void> {
  console.log("Creating bonus level file...");
  
  // Add the path field for bonus levels
  const pathField = `  path: "/bonus-level/${dateString}",`;
  
  // Insert the path field after the opening brace of the level object
  let modifiedCode = generatedCode;
  const levelMatch = modifiedCode.match(/const level[^\s]* = {/);
  if (levelMatch) {
    const insertIndex = modifiedCode.indexOf('{', levelMatch.index!) + 1;
    modifiedCode = modifiedCode.slice(0, insertIndex) + '\n' + pathField + modifiedCode.slice(insertIndex);
  }
  
  // Replace any level variable name (including ones with invalid characters) with just "level"
  modifiedCode = modifiedCode.replace(/const level[^\s]* = {/, 'const level = {');
  modifiedCode = modifiedCode.replace(/export default level[^\s]*;/, 'export default level;');
  
  const levelFile = `${dateString}.ts`;
  await fs.writeFile(path.join(bonusLevelsDir, levelFile), modifiedCode);
  console.log(`Bonus level file created with path field: ${levelFile}`);
}

async function updatePreviousBonusLevelFile(bonusLevelsDir: string, dateString: string): Promise<void> {
  try {
    const lastBonusDate = await getLastBonusLevelDate();
    if (!lastBonusDate || lastBonusDate === dateString) {
      console.log("No previous bonus level to update or this is the first bonus level");
      return;
    }

    console.log(`Updating previous bonus level file: ${lastBonusDate}`);
    const previousBonusFile = `${lastBonusDate}.ts`;
    const previousFileDir = path.join(bonusLevelsDir, previousBonusFile);
    
    let bonusContent = await fs.readFile(previousFileDir, "utf8");
    
    // Remove the isNew: true field from the previous bonus level
    bonusContent = bonusContent.replace(/\n  isNew: true,/, "");
    
    await fs.writeFile(previousFileDir, bonusContent);
    console.log(`Updated ${previousBonusFile} - removed isNew flag`);
  } catch (error) {
    console.log("Error updating previous bonus level file:", error);
    // Don't throw error as this is not critical for the main functionality
  }
}

async function updateBonusLevelsFile(
  bonusLevelsFile: string,
  dateString: string
): Promise<void> {
  console.log("Updating bonus levels file...");
  let bonusLevelsContent = await fs.readFile(bonusLevelsFile, "utf8");
  
  const variableName = `level${formatDateForVariableName(dateString)}`;
  
  // Add the new import statement at the end of the imports block
  const importStatement = `\nimport ${variableName} from "./bonus-levels/${dateString}";`;
  const importRegex = /import\s+level\d+\s+from\s+"\.\/bonus-levels\/[\d-]+";/g;
  const importMatches = bonusLevelsContent.match(importRegex);

  if (importMatches) {
    const lastImport = importMatches[importMatches.length - 1];
    const lastImportIndex =
      bonusLevelsContent.lastIndexOf(lastImport) + lastImport.length;
    bonusLevelsContent =
      bonusLevelsContent.slice(0, lastImportIndex) +
      importStatement +
      bonusLevelsContent.slice(lastImportIndex);
  } else {
    bonusLevelsContent = importStatement + bonusLevelsContent;
  }

  // Update the export statement
  const exportMatch = bonusLevelsContent.match(
    /export\s+const\s+bonusLevels\s*:\s*{[^}]*}\s*=\s*{([\s\S]*?)}\s*;/
  );
  if (exportMatch && exportMatch[1] !== undefined) {
    const existingLevels = exportMatch[1].trim();
    let newLevels: string;

    if (existingLevels) {
      const levelsArray = existingLevels
        .split(",")
        .map((level) => level.trim())
        .filter((level) => level);
      levelsArray.push(variableName);
      newLevels = levelsArray.map((level) => `  ${level},`).join("\n");
    } else {
      newLevels = `  ${variableName},`;
    }

    bonusLevelsContent = bonusLevelsContent.replace(
      /export\s+const\s+bonusLevels\s*:\s*{[^}]*}\s*=\s*{([\s\S]*?)}\s*;/,
      `export const bonusLevels: { [key: string]: BonusLevel } = {\n${newLevels}\n};`
    );
    await fs.writeFile(bonusLevelsFile, bonusLevelsContent);
  } else {
    throw new Error("Could not find export statement in bonusLevels.ts");
  }
}

async function addNewLevel(
  levelNumber: number,
  headless: boolean = true,
  stopAt?: string
): Promise<void> {
  const browser: Browser = await chromium.launch({ 
    headless,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ]
  });
  const context = await browser.newContext({
    permissions: ["clipboard-read", "clipboard-write"],
    // Ensure JavaScript is enabled
    javaScriptEnabled: true,
    // Set a user agent to avoid being blocked
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    // Set viewport size
    viewport: { width: 1280, height: 720 }
  });
  const page: Page = await context.newPage();
  const stopStep = stopAt?.toLowerCase() as AutomationSteps;

  try {
    // Step 1: Navigate to game
    await navigateToGame(page);
    if (stopStep === AutomationSteps.NAVIGATE) return;

    // Step 2: Start game
    await startGameIfNeeded(page);
    if (stopStep === AutomationSteps.START) return;

    // Step 3: Capture screenshot
    const screenshotPath = await captureScreenshot(page, levelNumber.toString());
    if (stopStep === AutomationSteps.CAPTURE) return;

    // Step 4: Navigate to level builder
    await navigateToLevelBuilder(page);
    if (stopStep === AutomationSteps.BUILDER) return;

    // Step 5: Select LinkedIn level type (do this before upload)
    await selectLinkedInButton(page);
    if (stopStep === AutomationSteps.LINKEDIN) return;

    // Step 6: Upload screenshot
    await uploadScreenshot(page, screenshotPath);
    if (stopStep === AutomationSteps.UPLOAD) return;

    // Step 7: Set level name
    await setLevelName(page, levelNumber.toString());
    if (stopStep === AutomationSteps.NAME) return;

    // Step 8: Generate and copy code
    const generatedCode = await generateAndCopyCode(page);
    if (stopStep === AutomationSteps.GENERATE) return;

    const projectRoot = path.resolve(__dirname, "..");
    const utilsDir: string = path.join(projectRoot, "src", "utils");
    const levelsDir: string = path.join(utilsDir, "levels");
    const levelsFile: string = path.join(utilsDir, "levels.ts");

    await fs.mkdir(levelsDir, { recursive: true });

    // Step 9: Create level file
    await createLevelFile(levelsDir, levelNumber, generatedCode);
    if (stopStep === AutomationSteps.FILE) return;

    // Step 10: Update previous level file
    await updatePreviousLevelFile(levelsDir, levelNumber);

    // Step 11: Update levels file
    await updateLevelsFile(levelsFile, levelNumber);
    if (stopStep === AutomationSteps.LEVELS) return;

    // Step 12: Update README
    const readmePath: string = path.join(projectRoot, "README.md");
    await updateReadme(readmePath, levelNumber);
    if (stopStep === AutomationSteps.README) return;

    // Step 13: Complete
    console.log(`Level ${levelNumber} added successfully!`);
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : String(error)
    );
    throw error;
  } finally {
    await browser.close();
  }
}

// New function to add bonus levels
async function addBonusLevel(
  headless: boolean = true,
  stopAt?: string
): Promise<void> {
  const browser: Browser = await chromium.launch({ 
    headless,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ]
  });
  const context = await browser.newContext({
    permissions: ["clipboard-read", "clipboard-write"],
    // Ensure JavaScript is enabled
    javaScriptEnabled: true,
    // Set a user agent to avoid being blocked
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    // Set viewport size
    viewport: { width: 1280, height: 720 }
  });
  const page: Page = await context.newPage();
  const stopStep = stopAt?.toLowerCase() as AutomationSteps;

  const dateString = await getNextBonusLevelDate();
  console.log(`Adding bonus level for date: ${dateString}`);

  try {
    // Step 1: Navigate to game (bonus mode)
    await navigateToGame(page, "bonus");
    if (stopStep === AutomationSteps.NAVIGATE) return;

    // Step 2: Start game
    await startGameIfNeeded(page);
    if (stopStep === AutomationSteps.START) return;

    // Step 3: Capture screenshot
    const screenshotPath = await captureScreenshot(page, dateString, "bonus");
    if (stopStep === AutomationSteps.CAPTURE) return;

    // Step 4: Navigate to level builder
    await navigateToLevelBuilder(page);
    if (stopStep === AutomationSteps.BUILDER) return;

    // Step 5: Select LinkedIn level type (do this before upload)
    await selectLinkedInButton(page);
    if (stopStep === AutomationSteps.LINKEDIN) return;

    // Step 6: Upload screenshot
    await uploadScreenshot(page, screenshotPath);
    if (stopStep === AutomationSteps.UPLOAD) return;

    // Step 7: Set level name
    await setLevelName(page, dateString);
    if (stopStep === AutomationSteps.NAME) return;

    // Step 8: Generate and copy code
    const generatedCode = await generateAndCopyCode(page);
    if (stopStep === AutomationSteps.GENERATE) return;

    const projectRoot = path.resolve(__dirname, "..");
    const utilsDir = path.join(projectRoot, "src", "utils");
    const bonusLevelsDir = path.join(utilsDir, "bonus-levels");
    const bonusLevelsFile = path.join(utilsDir, "bonusLevels.ts");

    await fs.mkdir(bonusLevelsDir, { recursive: true });

    // Step 9: Create bonus level file
    await createBonusLevelFile(bonusLevelsDir, dateString, generatedCode);
    if (stopStep === AutomationSteps.FILE) return;

    // Step 10: Update previous bonus level file
    await updatePreviousBonusLevelFile(bonusLevelsDir, dateString);

    // Step 11: Update bonus levels file
    await updateBonusLevelsFile(bonusLevelsFile, dateString);
    if (stopStep === AutomationSteps.LEVELS) return;

    // Step 12: Complete (no README update for bonus levels)
    console.log(`Bonus level ${dateString} added successfully!`);
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : String(error)
    );
    throw error;
  } finally {
    await browser.close();
  }
}

// Utility functions for bonus levels
function getNextSundayDate(): string {
  const today = new Date();
  const daysUntilSunday = (7 - today.getDay()) % 7;
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + (daysUntilSunday === 0 ? 7 : daysUntilSunday));
  return nextSunday.toISOString().split('T')[0]; // YYYY-MM-DD format
}

async function getLastBonusLevelDate(excludeDate?: string): Promise<string | null> {
  try {
    const projectRoot = path.resolve(__dirname, "..");
    const bonusLevelsFile = path.join(projectRoot, "src", "utils", "bonusLevels.ts");
    const content = await fs.readFile(bonusLevelsFile, "utf8");
    
    // Extract dates from import statements
    const importMatches = content.match(/import level(\d{8}) from "\.\/bonus-levels\/(\d{4}-\d{2}-\d{2})"/g);
    if (!importMatches) return null;
    
    const dates = importMatches.map(match => {
      const dateMatch = match.match(/(\d{4}-\d{2}-\d{2})/);
      return dateMatch ? dateMatch[1] : null;
    }).filter(Boolean).filter(date => date !== excludeDate).sort();
    
    return dates.length > 0 ? dates[dates.length - 1] : null;
  } catch (error) {
    console.log("Could not determine last bonus level date:", error);
    return null;
  }
}

async function getNextBonusLevelDate(): Promise<string> {
  const lastDate = await getLastBonusLevelDate();
  if (!lastDate) {
    // If no previous date found, use next Sunday
    return getNextSundayDate();
  }
  
  // Add 7 days to the last date
  const lastDateObj = new Date(lastDate + 'T00:00:00');
  lastDateObj.setDate(lastDateObj.getDate() + 7);
  return lastDateObj.toISOString().split('T')[0];
}

function formatDateForVariableName(date: string): string {
  return date.replace(/-/g, '');
}

// Function to show available steps
function showSteps() {
  console.log("Available automation steps:");
  Object.values(AutomationSteps).forEach((step) => {
    console.log(`- ${step}`);
  });
}

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option("level", {
    type: "number",
    description: "Level number to add (for regular levels)",
  })
  .option("bonus", {
    type: "boolean",
    default: false,
    description: "Add a bonus level instead of a regular level",
  })
  .option("headless", {
    type: "boolean",
    default: true,
    description: "Run in headless mode",
  })
  .option("stop-at", {
    type: "string",
    description: "Stop automation at specific step",
  })
  .option("show-steps", {
    type: "boolean",
    default: false,
    description: "Show all available steps and exit",
  })
  .check((argv) => {
    if (!argv["show-steps"]) {
      if (argv.bonus) {
        // For bonus levels, we don't need a level number
        return true;
      } else if (typeof argv.level !== "number") {
        throw new Error(
          'Argument "level" is required when not using --bonus or --show-steps'
        );
      }
    }
    return true;
  })
  .help().argv as {
  level?: number;
  bonus: boolean;
  headless: boolean;
  "stop-at"?: string;
  "show-steps": boolean;
};

// Main execution
async function main() {
  if (argv["show-steps"]) {
    showSteps();
    return;
  }

  if (argv.bonus) {
    // Add bonus level
    await addBonusLevel(argv.headless, argv["stop-at"]).catch(
      (error) => {
        console.error("Failed to add bonus level:", error);
        process.exit(1);
      }
    );
  } else {
    // Add regular level - we know level exists here because of the check above
    await addNewLevel(argv.level!, argv.headless, argv["stop-at"]).catch(
      (error) => {
        console.error("Failed to add level:", error);
        process.exit(1);
      }
    );
  }
}

main();
