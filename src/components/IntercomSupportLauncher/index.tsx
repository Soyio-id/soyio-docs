import { useCallback, useEffect, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

type IntercomClient = {
  (command: 'booted'): boolean;
  (command: string, ...args: unknown[]): void;
};

type IntercomSettings = {
  app_id: string;
  hide_default_launcher?: boolean;
  custom_launcher_selector?: string;
  disabled?: boolean;
  [key: string]: unknown;
};

declare global {
  interface Window {
    Intercom?: IntercomClient;
    intercomSettings?: IntercomSettings;
  }
}

const CONSENT_STORAGE_KEY = 'soyio:intercom:consent';
const INTERCOM_LAUNCHER_ID = 'soyio-intercom-launcher';
const DEFAULT_INTERCOM_SETTINGS: IntercomSettings = {
  app_id: 't56kvykx',
  hide_default_launcher: true,
  custom_launcher_selector: `#${INTERCOM_LAUNCHER_ID}`,
};

const getIntercomSettings = (): IntercomSettings => {
  if (typeof window === 'undefined') {
    return DEFAULT_INTERCOM_SETTINGS;
  }

  return {
    ...DEFAULT_INTERCOM_SETTINGS,
    ...(window.intercomSettings ?? {}),
  };
};

const getStoredConsent = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted';
  } catch (error) {
    console.warn('Unable to read Intercom consent from localStorage', error);
    return false;
  }
};

const persistConsent = () => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
  } catch (error) {
    console.warn('Unable to persist Intercom consent', error);
  }
};

const SupportLauncherInner = () => {
  const [hasConsent, setHasConsent] = useState(false);
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const enableIntercom = useCallback(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const intercom = window.Intercom;

    if (typeof intercom !== 'function') {
      setErrorMessage('El chat todavía no está disponible. Inténtalo nuevamente en unos segundos.');
      return false;
    }

    try {
      const currentSettings = window.intercomSettings ?? getIntercomSettings();
      const updatedSettings: IntercomSettings = {
        ...currentSettings,
        disabled: false,
      };

      const isBooted = Boolean(intercom('booted'));
      const isDisabled = Boolean(currentSettings?.disabled);

      if (!isBooted) {
        window.intercomSettings = updatedSettings;
        intercom('boot', updatedSettings);
      } else if (isDisabled) {
        window.intercomSettings = updatedSettings;
        intercom('update', updatedSettings);
      }

      setErrorMessage(null);
      return true;
    } catch (error) {
      console.error('Unable to enable Intercom messenger', error);
      setErrorMessage('No pudimos iniciar el chat. Inténtalo nuevamente en unos segundos.');
      return false;
    }
  }, []);

  const openMessenger = useCallback(() => {
    const isReady = enableIntercom();
    if (isReady) {
      window.Intercom?.('show');
    }
  }, [enableIntercom]);

  useEffect(() => {
    if (getStoredConsent()) {
      setHasConsent(true);
      enableIntercom();
    }
  }, [enableIntercom]);

  const handleButtonClick = useCallback(() => {
    setErrorMessage(null);
    if (hasConsent) {
      openMessenger();
    } else {
      setIsPromptVisible(true);
    }
  }, [hasConsent, openMessenger]);

  const handleAccept = useCallback(() => {
    persistConsent();
    setHasConsent(true);
    setIsPromptVisible(false);
    setErrorMessage(null);
    openMessenger();
  }, [openMessenger]);

  const handleDismiss = useCallback(() => {
    setIsPromptVisible(false);
    setErrorMessage(null);
  }, []);

  const consentMessage = useMemo(
    () =>
      'Usamos Intercom para responder tus consultas. Debemos habilitar una cookie funcional (.soyio.id) para mantener la conversación. ¿Deseas continuar?',
    [],
  );

  return (
    <div className={styles.launcherWrapper}>
      {isPromptVisible && (
        <section
          className={`${styles.prompt} ${styles.promptVisible}`}
          aria-label="Aviso sobre cookies para abrir el chat"
          role="dialog"
        >
          <p className={styles.promptText}>{consentMessage}</p>
          {errorMessage && <p className={styles.errorInline}>{errorMessage}</p>}
          <div className={styles.promptActions}>
            <button type="button" className={styles.acceptButton} onClick={handleAccept}>
              Aceptar y abrir chat
            </button>
            <button type="button" className={styles.declineButton} onClick={handleDismiss}>
              Cancelar
            </button>
          </div>
        </section>
      )}
      {!isPromptVisible && errorMessage && <p className={styles.errorBanner}>{errorMessage}</p>}
      <button
        type="button"
        id={INTERCOM_LAUNCHER_ID}
        className={styles.launcherButton}
        onClick={handleButtonClick}
        aria-haspopup="dialog"
        aria-expanded={isPromptVisible}
      >
        <Icon icon="mdi:message-question" className={styles.icon} />
      </button>
    </div>
  );
};

const IntercomSupportLauncher = () => (
  <BrowserOnly>{() => <SupportLauncherInner />}</BrowserOnly>
);

export default IntercomSupportLauncher;
