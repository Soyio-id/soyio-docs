// @ts-check
const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const e2ePort = Number(process.env.E2E_PORT ?? '4173');
const isCi = !!process.env.CI;
const e2eServerCommand = isCi
  ? `pnpm run build && pnpm run serve --port ${e2ePort} --host 127.0.0.1`
  : `pnpm start --no-open --port ${e2ePort} --host 127.0.0.1`;

const config = {
  testDir: './tests/e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: `http://127.0.0.1:${e2ePort}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: {
    command: e2eServerCommand,
    port: e2ePort,
    timeout: 120 * 1000,
    reuseExistingServer: false,
  },
};

module.exports = config;
