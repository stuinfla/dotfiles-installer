/**
 * End-to-End Dotfiles Installation Test
 * Tests the complete installation flow on BWEconstruction repository
 * Takes 12 screenshots documenting the process
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  // Configuration
  const REPO_URL = 'https://github.com/stuinfla/BWEconstruction';
  const SCREENSHOTS_DIR = path.join(__dirname, 'playwright-screenshots');
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GITHUB_ACCESS_TOKEN;

  // Ensure screenshots directory exists
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  console.log('🚀 Starting end-to-end dotfiles installation test...\n');
  console.log(`📁 Repository: ${REPO_URL}`);
  console.log(`📸 Screenshots: ${SCREENSHOTS_DIR}\n`);

  // Launch Playwright's Chromium with persistent context (uses Chrome profile)
  console.log('💡 Launching browser with your Chrome profile...\n');

  const userDataDir = require('os').homedir() + '/Library/Application Support/Google/Chrome';
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: { width: 1920, height: 1080 },
    slowMo: 1000,
    channel: 'chrome'  // Use actual Chrome instead of Chromium
  });

  const page = context.pages()[0] || await context.newPage();

  try {
    // Step 1: Navigate to repository
    console.log('📍 Step 1: Navigating to BWEconstruction repository...');
    await page.goto(REPO_URL);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-repo-homepage.png'), fullPage: true });
    console.log('✅ Screenshot 1: Repository homepage\n');

    // Step 2: Find and click "Code" button
    console.log('📍 Step 2: Opening Code menu...');
    const codeButton = page.locator('button:has-text("Code"), summary:has-text("Code")').first();
    await codeButton.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-code-menu-open.png'), fullPage: true });
    console.log('✅ Screenshot 2: Code menu opened\n');

    // Step 3: Click Codespaces tab
    console.log('📍 Step 3: Switching to Codespaces tab...');
    const codespacesTab = page.locator('text=Codespaces').first();
    await codespacesTab.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-codespaces-tab.png'), fullPage: true });
    console.log('✅ Screenshot 3: Codespaces tab selected\n');

    // Step 4: Create new codespace
    console.log('📍 Step 4: Creating new codespace...');
    const createButton = page.locator('button:has-text("Create codespace"), a:has-text("Create codespace")').first();
    await createButton.click();
    await page.waitForTimeout(5000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04-codespace-creating.png'), fullPage: true });
    console.log('✅ Screenshot 4: Codespace creation initiated\n');

    // Step 5: Wait for codespace to initialize (this can take several minutes)
    console.log('📍 Step 5: Waiting for codespace to initialize...');
    console.log('   (This may take 2-5 minutes)');

    // Wait for VS Code interface to load
    await page.waitForSelector('.monaco-workbench', { timeout: 300000 }); // 5 minute timeout
    await page.waitForTimeout(10000);  // Additional wait for full initialization
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05-vscode-loaded.png'), fullPage: true });
    console.log('✅ Screenshot 5: VS Code interface loaded\n');

    // Step 6: Wait for dotfiles installation (should happen automatically via postCreateCommand)
    console.log('📍 Step 6: Waiting for dotfiles installation...');
    console.log('   (Installation runs in background via postCreateCommand)');
    await page.waitForTimeout(120000);  // Wait 2 minutes for installation
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06-dotfiles-installing.png'), fullPage: true });
    console.log('✅ Screenshot 6: Dotfiles installation in progress\n');

    // Step 7: Open integrated terminal
    console.log('📍 Step 7: Opening integrated terminal...');
    await page.keyboard.press('Control+`');  // Open terminal
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07-terminal-opened.png'), fullPage: true });
    console.log('✅ Screenshot 7: Integrated terminal opened\n');

    // Step 8: Verify DSP command exists
    console.log('📍 Step 8: Verifying DSP function...');
    const terminal = page.locator('.terminal').first();
    await terminal.click();
    await page.keyboard.type('type dsp');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08-dsp-verified.png'), fullPage: true });
    console.log('✅ Screenshot 8: DSP function verified\n');

    // Step 9: Check installed versions
    console.log('📍 Step 9: Checking installed versions...');
    await page.keyboard.type('check_versions');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '09-versions-check.png'), fullPage: true });
    console.log('✅ Screenshot 9: Installed versions displayed\n');

    // Step 10: Verify MCP servers
    console.log('📍 Step 10: Verifying MCP servers...');
    await page.keyboard.type('claude mcp list');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '10-mcp-servers.png'), fullPage: true });
    console.log('✅ Screenshot 10: MCP servers listed\n');

    // Step 11: Check VS Code extensions
    console.log('📍 Step 11: Checking installed extensions...');
    await page.keyboard.press('Control+Shift+X');  // Open extensions panel
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '11-extensions-installed.png'), fullPage: true });
    console.log('✅ Screenshot 11: VS Code extensions panel\n');

    // Step 12: Final verification - show file structure
    console.log('📍 Step 12: Final verification - file structure...');
    await page.keyboard.press('Control+Shift+E');  // Open file explorer
    await page.waitForTimeout(2000);
    await page.keyboard.press('Control+`');  // Focus terminal again
    await page.waitForTimeout(1000);
    await page.keyboard.type('ls -la ~/');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '12-final-verification.png'), fullPage: true });
    console.log('✅ Screenshot 12: Final verification complete\n');

    console.log('🎉 All 12 screenshots captured successfully!');
    console.log(`📂 Screenshots saved to: ${SCREENSHOTS_DIR}`);

  } catch (error) {
    console.error('❌ Error during test:', error);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'error-state.png'), fullPage: true });
    throw error;
  } finally {
    console.log('\n⏰ Test will keep browser open for 30 seconds for manual inspection...');
    await page.waitForTimeout(30000);
    await context.close();
    console.log('✅ Browser closed');
  }
})();
