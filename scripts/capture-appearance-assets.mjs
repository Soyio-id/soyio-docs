import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(__dirname, '..');
const outputDir = path.join(docsRoot, 'static', 'img', 'appearance');
const storybookBaseUrl = process.env.STORYBOOK_BASE_URL ?? 'http://127.0.0.1:6007';

const captures = [
  { storyId: 'components-card--annotated', fileName: 'card-annotated.png' },
  { storyId: 'components-dialog--annotated', fileName: 'dialog-annotated.png' },
  { storyId: 'components-input--annotated', fileName: 'input-annotated.png' },
  { storyId: 'components-input--annotated-with-error', fileName: 'input-with-error-annotated.png' },
  { storyId: 'components-input--annotated-textarea', fileName: 'textarea-annotated.png' },
  { storyId: 'components-multiselect--annotated', fileName: 'select-annotated.png' },
  { storyId: 'components-combobox--annotated', fileName: 'combobox-annotated.png' },
  { storyId: 'components-nininput--annotated', fileName: 'nin-input-annotated.png' },
  { storyId: 'components-trackingcodeinput--annotated', fileName: 'tracking-code-annotated.png' },
  { storyId: 'components-button--annotated-primary', fileName: 'button-annotated.png' },
  { storyId: 'components-button--annotated-link', fileName: 'link-annotated.png' },
  { storyId: 'components-checkbox--annotated', fileName: 'checkbox-annotated.png' },
  { storyId: 'components-radioinput--annotated', fileName: 'radio-input-annotated.png' },
  { storyId: 'components-switch--annotated', fileName: 'switch-annotated.png' },
  { storyId: 'components-radiocard--annotated', fileName: 'radio-card-annotated.png' },
  { storyId: 'components-stepindicator--annotated', fileName: 'step-indicator-annotated.png' },
  { storyId: 'components-loader--annotated', fileName: 'loader-annotated.png' },
  { storyId: 'components-tooltip--annotated', fileName: 'tooltip-annotated.png' },
  { storyId: 'components-alert--annotated', fileName: 'alert-annotated.png' },
  { storyId: 'components-chip--annotated', fileName: 'chip-annotated.png' },
  { storyId: 'consent-rootdatauselabel--annotated', fileName: 'category-tag-annotated.png' },
  { storyId: 'consent-consentheader--annotated', fileName: 'badge-annotated.png' },
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1800, height: 1200 }, deviceScaleFactor: 2 });

for (const capture of captures) {
  const url = `${storybookBaseUrl}/iframe.html?id=${capture.storyId}&viewMode=story`;
  const filePath = path.join(outputDir, capture.fileName);

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForSelector('#storybook-root > *');
  await page.waitForTimeout(300);

  const story = page.locator('#storybook-root > *').first();

  await story.screenshot({ path: filePath });
  process.stdout.write(`Captured ${capture.fileName}\n`);
}

await browser.close();
