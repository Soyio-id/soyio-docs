import React, { useState, useEffect, useRef, useCallback } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { consentPresets, privacyCenterPresets } from './presets';
import { githubLightTheme, draculaTheme } from './themes';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { appearanceSchema } from '@soyio/soyio-widget';

type WidgetType = 'privacy-center' | 'consent-box';

// Default config for Privacy Center
const DEFAULT_PRIVACY_CENTER_CONFIG = {
  companyId: 'com_test',
  isSandbox: true,
  demo: true,
  productionUrl: 'https://privacy.soyio.id',
};

// Default config for Consent Box (only needs consentTemplateId, no companyId)
const DEFAULT_CONSENT_BOX_CONFIG = {
  consentTemplateId: 'constpl_cvssApVPAAqkVMrrxH_7jg' as const,
  isSandbox: true,
  demo: true,
  productionUrl: 'https://app.soyio.id',
};

// Custom hook to detect Docusaurus theme
const useThemeDetector = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setTheme(currentTheme === 'dark' ? 'dark' : 'light');
    };

    updateTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          updateTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
};

// Debounce hook for editor changes
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

// Copy icon SVG
const CopyIcon = () => (
  <svg
    className={styles.copyIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect
      x="9"
      y="9"
      width="13"
      height="13"
      rx="2"
      ry="2"
    />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

// Check icon SVG
const CheckIcon = () => (
  <svg
    className={styles.copyIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface PrivacyCenterBoxWidget {
  mount: (selector: string) => void;
  updateAppearance: (appearance: Record<string, unknown>) => void;
  unmount: () => void;
}

const AppearanceDemoContent = () => {
  const { siteConfig } = useDocusaurusContext();
  const privacyCenterUrl = siteConfig.customFields?.privacyCenterUrl as string;
  const colorMode = useThemeDetector();

  const [activeTab, setActiveTab] = useState<WidgetType>('privacy-center');

  // Get the appropriate presets based on active tab
  const currentPresets =
    activeTab === 'consent-box' ? consentPresets : privacyCenterPresets;

  // Initialize with privacy center presets (default tab)
  const initialPresetName = Object.keys(privacyCenterPresets)[0];
  const [currentPreset, setCurrentPreset] = useState(initialPresetName);
  const [jsonValue, setJsonValue] = useState(
    JSON.stringify(
      privacyCenterPresets[
        initialPresetName as keyof typeof privacyCenterPresets
      ].appearance,
      null,
      2,
    ),
  );
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<PrivacyCenterBoxWidget | null>(null);
  const isWidgetReadyRef = useRef(false);

  const debouncedJsonValue = useDebounce(jsonValue, 300);

  // Calculate editor height based on content
  const editorHeight = React.useMemo(() => {
    const lineCount = jsonValue.split('\n').length;
    const lineHeight = 19; // Monaco's default line height for fontSize 14
    const padding = 16; // Top and bottom padding combined
    return Math.max(lineCount * lineHeight + 2 * padding, 12); // Minimum 200px
  }, [jsonValue]);

  const parseAppearance = useCallback((json: string) => {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  }, []);

  const handlePresetClick = useCallback(
    (name: string) => {
      setCurrentPreset(name);
      const preset = currentPresets[name as keyof typeof currentPresets];
      if (preset) {
        const newJson = JSON.stringify(preset.appearance, null, 2);
        setJsonValue(newJson);

        const appearance = parseAppearance(newJson);
        if (appearance && widgetRef.current && isWidgetReadyRef.current) {
          widgetRef.current.updateAppearance(appearance);
        }
      }
    },
    [parseAppearance, currentPresets],
  );

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setJsonValue(value);
    }
  };

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(jsonValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [jsonValue]);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    },
    [isFullscreen],
  );

  const handleEditorWillMount = useCallback((monaco: Monaco) => {
    // Register custom themes
    monaco.editor.defineTheme('github-light', githubLightTheme);
    monaco.editor.defineTheme('dracula', draculaTheme);

    // Set JSON schema for validation
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: 'soyio-appearance.json',
          fileMatch: ['*'],
          schema: appearanceSchema,
        },
      ],
    });
  }, []);

  // Maintain selected preset when switching tabs (if it exists in both)
  useEffect(() => {
    const newPresets =
      activeTab === 'consent-box' ? consentPresets : privacyCenterPresets;

    // Check if current preset exists in the new tab's presets
    const presetExists = currentPreset in newPresets;
    const presetNameToUse = presetExists
      ? currentPreset
      : Object.keys(newPresets)[0];

    setCurrentPreset(presetNameToUse);
    const preset = newPresets[presetNameToUse as keyof typeof newPresets];
    if (preset) {
      const newJson = JSON.stringify(preset.appearance, null, 2);
      setJsonValue(newJson);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Mount widget based on activeTab
  useEffect(() => {
    if (!containerRef.current || !privacyCenterUrl) return;

    // Get the appropriate presets for the current tab
    const currentPresets =
      activeTab === 'consent-box' ? consentPresets : privacyCenterPresets;

    // Determine which preset to use: if current preset exists in new tab, use it; otherwise use first preset
    const presetExists = currentPreset in currentPresets;
    const presetNameToUse = presetExists
      ? currentPreset
      : Object.keys(currentPresets)[0];

    // Update preset state if it changed (to keep UI in sync)
    if (presetNameToUse !== currentPreset) {
      setCurrentPreset(presetNameToUse);
    }

    const preset =
      currentPresets[presetNameToUse as keyof typeof currentPresets];
    if (!preset) return;

    const initialAppearance = preset.appearance;
    if (!initialAppearance) return;

    // Update jsonValue to match the preset being used
    const newJson = JSON.stringify(initialAppearance, null, 2);
    setJsonValue(newJson);

    // Select appropriate config based on active tab
    const baseConfig =
      activeTab === 'privacy-center'
        ? DEFAULT_PRIVACY_CENTER_CONFIG
        : DEFAULT_CONSENT_BOX_CONFIG;

    const config = {
      ...baseConfig,
      // Only include developmentUrl for Privacy Center
      ...(activeTab === 'privacy-center' && {
        developmentUrl: privacyCenterUrl,
      }),
      appearance: initialAppearance,
      onEvent: (event: unknown) => console.log(`${activeTab} Event:`, event),
      onReady: () => {
        isWidgetReadyRef.current = true;
        // Reset scroll position to top when widget is ready
        if (containerRef.current) {
          containerRef.current.scrollTop = 0;
        }
      },
    };

    let isMounted = true;

    // Dynamic import for widget
    // @ts-expect-error - Dynamic imports are supported at runtime, but TypeScript config doesn't allow it
    import('@soyio/soyio-widget')
      .then((module) => {
        if (!isMounted) return;

        try {
          const WidgetClass =
            activeTab === 'privacy-center'
              ? module.PrivacyCenterBox
              : module.ConsentBox;
          const widget = new (WidgetClass as unknown as new (
            options: typeof config,
          ) => PrivacyCenterBoxWidget)(config);
          if (containerRef.current) {
            widget.mount(`#${containerRef.current.id}`);
            widgetRef.current = widget;
          }
        } catch (e) {
          console.error('Widget mount failed', e);
        }
      })
      .catch((err) => console.error('Failed to load widget', err));

    return () => {
      isMounted = false;
      isWidgetReadyRef.current = false;
      if (widgetRef.current) {
        try {
          widgetRef.current.unmount();
        } catch {
          /* ignore */
        }
        widgetRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privacyCenterUrl, activeTab]);

  // Update appearance when debounced JSON changes
  useEffect(() => {
    if (!widgetRef.current || !isWidgetReadyRef.current) return;

    const appearance = parseAppearance(debouncedJsonValue);
    if (appearance) {
      widgetRef.current.updateAppearance(appearance);
    }
  }, [debouncedJsonValue, parseAppearance]);

  // Handle fullscreen keyboard events and body overflow
  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen, handleKeyDown]);

  return (
    <div
      className={isFullscreen ? styles.containerFullscreen : styles.container}
    >
      <div className={isFullscreen ? styles.contentFullscreen : styles.content}>
        {/* Right Panel (Preview Section) - First in normal mode */}
        <div
          className={
            isFullscreen ? styles.rightPanelFullscreen : styles.rightPanel
          }
        >
          <div className={styles.previewHeader}>
            <div className={styles.previewHeaderLeft}>
              <span>Vista previa</span>
              {/* Widget Type Tabs */}
              <div className={styles.widgetTabs}>
                <button
                  className={`${styles.widgetTab} ${activeTab === 'privacy-center' ? styles.active : ''}`}
                  onClick={() => setActiveTab('privacy-center')}
                >
                  Centro de privacidad
                </button>
                <button
                  className={`${styles.widgetTab} ${activeTab === 'consent-box' ? styles.active : ''}`}
                  onClick={() => setActiveTab('consent-box')}
                >
                  Consentimiento
                </button>
              </div>
            </div>
            {/* Fullscreen Toggle Button */}
            <button
              className={styles.fullscreenButton}
              onClick={handleToggleFullscreen}
              aria-label={
                isFullscreen
                  ? 'Salir de pantalla completa'
                  : 'Pantalla completa'
              }
              title={
                isFullscreen
                  ? 'Salir de pantalla completa (ESC)'
                  : 'Pantalla completa'
              }
            >
              {isFullscreen ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8" />
                    <path d="M9 19.8V15m0 0H4.2M9 15l-6 6" />
                    <path d="M15 4.2V9m0 0h4.8M15 9l6-6" />
                    <path d="M9 4.2V9m0 0H4.2M9 9 3 3" />
                  </svg>
                  Contraer
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 15 6 6" />
                    <path d="m15 9 6-6" />
                    <path d="M21 16v5h-5" />
                    <path d="M21 8V3h-5" />
                    <path d="M3 16v5h5" />
                    <path d="m3 21 6-6" />
                    <path d="M3 8V3h5" />
                    <path d="M9 9 3 3" />
                  </svg>
                  Expandir
                </>
              )}
            </button>
          </div>
          <div
            id="soyio-privacy-center-preview"
            ref={containerRef}
            className={
              activeTab === 'consent-box'
                ? styles.widgetContainerConsent
                : styles.widgetContainer
            }
          />
        </div>

        {/* Left Panel (Editor Section) - Second in normal mode */}
        <div
          className={
            isFullscreen ? styles.leftPanelFullscreen : styles.leftPanel
          }
        >
          {/* Presets Section */}
          <div className={styles.presetsSection}>
            <div className={styles.editorHeader}>
              {/* Presets */}
              <div className={styles.presetsRow}>
                <span className={styles.presetsLabel}>Presets</span>
                <div className={styles.presetButtons}>
                  {Object.keys(currentPresets).map((name) => (
                    <button
                      key={name}
                      className={`${styles.presetBtn} ${currentPreset === name ? styles.active : ''}`}
                      onClick={() => handlePresetClick(name)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* File title and copy button */}
              <div className={styles.fileTitleRow}>
                <span className={styles.fileTitle}>appearance.json</span>
                <button
                  className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
                  onClick={handleCopy}
                  title={copied ? 'Copied!' : 'Copy to clipboard'}
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
            </div>

            <div className={styles.editorWrapper}>
              <Editor
                height={isFullscreen ? '100%' : `${editorHeight}px`}
                defaultLanguage="json"
                value={jsonValue}
                theme={colorMode === 'dark' ? 'dracula' : 'github-light'}
                onChange={handleEditorChange}
                beforeMount={handleEditorWillMount}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: 'var(--ifm-font-family-monospace)',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  formatOnPaste: true,
                  formatOnType: true,
                  automaticLayout: true,
                  lineNumbers: 'on',
                  renderLineHighlight: 'none',
                  padding: { top: 8, bottom: 8 },
                  scrollbar: {
                    verticalScrollbarSize: 10,
                    horizontalScrollbarSize: 10,
                  },
                  // Remove vertical line indicators
                  overviewRulerLanes: 0,
                  hideCursorInOverviewRuler: true,
                  overviewRulerBorder: false,
                  rulers: [],
                  // Fix for autocomplete tooltip overflow issues
                  fixedOverflowWidgets: true,
                  // Enhanced autocomplete settings
                  quickSuggestions: {
                    other: true,
                    comments: false,
                    strings: true,
                  },
                  suggestOnTriggerCharacters: true,
                  acceptSuggestionOnEnter: 'on',
                  tabCompletion: 'on',
                  suggest: {
                    showProperties: true,
                    showFields: true,
                    showKeywords: true,
                    showSnippets: true,
                    showValues: true,
                    showMethods: true,
                    showFunctions: true,
                    showConstants: true,
                    showEnums: true,
                    localityBonus: true,
                    shareSuggestSelections: true,
                    snippetsPreventQuickSuggestions: false,
                  },
                }}
              />
            </div>

            {/* Hint bar */}
            <div className={styles.hintBar}>
              <b>Tip:</b> Prueba cambiar estas variables a tu gusto
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AppearanceDemo() {
  return (
    <BrowserOnly fallback={<div>Loading Demo...</div>}>
      {() => <AppearanceDemoContent />}
    </BrowserOnly>
  );
}
