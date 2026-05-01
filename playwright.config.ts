import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const isCI = !!process.env.CI;
const hasBaseUrl = !!process.env.BASE_URL;

export default defineConfig({
  timeout: 60_000,

  expect: {
    timeout: 5_000,
  },

  testDir: './playwright/e2e',

  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,

  reporter: [
    ['html', { outputDir: './playwright-report' }],
    ['json', { outputFile: './playwright-report/report.json' }],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    trace: 'on',
    actionTimeout: 5_000,
    navigationTimeout: 10_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // 🚀 AQUI ESTÁ A MÁGICA
  webServer: hasBaseUrl
    ? undefined // 👉 NÃO sobe servidor se tiver BASE_URL (preview/CI)
    : {
      command: 'npm run dev -- --host 127.0.0.1 --port 5173',
      url: 'http://localhost:5173',
      reuseExistingServer: !isCI,
      timeout: 120_000,
    },
});