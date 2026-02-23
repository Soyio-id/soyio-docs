import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon, type IconifyIcon } from '@iconify/react';
import copyIcon from '@iconify-icons/mdi/content-copy';
import chevronDownIcon from '@iconify-icons/mdi/chevron-down';
import checkIcon from '@iconify-icons/mdi/check';
import warningIcon from '@iconify-icons/mdi/alert-circle';
import externalLinkIcon from '@iconify-icons/mdi/open-in-new';
import fileTextIcon from '@iconify-icons/lucide/file-text';
import openAiIcon from '@iconify-icons/simple-icons/openai';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { htmlToMarkdown } from '../../lib/htmlToMarkdown';

import styles from './styles.module.css';

type CopyStatus = 'idle' | 'copying' | 'copied' | 'error';

type IconData = Omit<IconifyIcon, 'name'>;

const claudeIcon: IconData = {
  body: '<path fill="currentColor" d="m4.714 15.956l4.718-2.648l.079-.23l-.08-.128h-.23l-.79-.048l-2.695-.073l-2.337-.097l-2.265-.122l-.57-.121l-.535-.704l.055-.353l.48-.321l.685.06l1.518.104l2.277.157l1.651.098l2.447.255h.389l.054-.158l-.133-.097l-.103-.098l-2.356-1.596l-2.55-1.688l-1.336-.972l-.722-.491L2 6.223l-.158-1.008l.656-.722l.88.06l.224.061l.893.686l1.906 1.476l2.49 1.833l.364.304l.146-.104l.018-.072l-.164-.274l-1.354-2.446l-1.445-2.49l-.644-1.032l-.17-.619a3 3 0 0 1-.103-.729L6.287.133L6.7 0l.995.134l.42.364l.619 1.415L9.735 4.14l1.555 3.03l.455.898l.243.832l.09.255h.159V9.01l.127-1.706l.237-2.095l.23-2.695l.08-.76l.376-.91l.747-.492l.583.28l.48.685l-.067.444l-.286 1.851l-.558 2.903l-.365 1.942h.213l.243-.242l.983-1.306l1.652-2.064l.728-.82l.85-.904l.547-.431h1.032l.759 1.129l-.34 1.166l-1.063 1.347l-.88 1.142l-1.263 1.7l-.79 1.36l.074.11l.188-.02l2.853-.606l1.542-.28l1.84-.315l.832.388l.09.395l-.327.807l-1.967.486l-2.307.462l-3.436.813l-.043.03l.049.061l1.548.146l.662.036h1.62l3.018.225l.79.522l.473.638l-.08.485l-1.213.62l-1.64-.389l-3.825-.91l-1.31-.329h-.183v.11l1.093 1.068l2.003 1.81l2.508 2.33l.127.578l-.321.455l-.34-.049l-2.204-1.657l-.85-.747l-1.925-1.62h-.127v.17l.443.649l2.343 3.521l.122 1.08l-.17.353l-.607.213l-.668-.122l-1.372-1.924l-1.415-2.168l-1.141-1.943l-.14.08l-.674 7.254l-.316.37l-.728.28l-.607-.461l-.322-.747l.322-1.476l.388-1.924l.316-1.53l.285-1.9l.17-.632l-.012-.042l-.14.018l-1.432 1.967l-2.18 2.945l-1.724 1.845l-.413.164l-.716-.37l.066-.662l.401-.589l2.386-3.036l1.439-1.882l.929-1.086l-.006-.158h-.055L4.138 18.56l-1.13.146l-.485-.456l.06-.746l.231-.243l1.907-1.312Z"/>',
  height: 24,
  width: 24,
};

const COPY_SUCCESS_TIMEOUT = 2000;
const DOCS_ROUTE_BASE_PATH = '/docs';

const CHATGPT_BASE_URL = 'https://chatgpt.com/?prompt=';
const CLAUDE_BASE_URL = 'https://claude.ai/new?q=';

function buildPrompt(url: string) {
  return `Lee esta página ${url} para poder hacer preguntas.`;
}

function buildMarkdownPath(pathname: string, docsRouteBasePath: string) {
  const trimmedPath = pathname.replace(/\/+$/, '');

  const normalizedPath =
    !trimmedPath || trimmedPath === '/' ? '/' : trimmedPath;
  const docsPath = normalizedPath.startsWith(`${docsRouteBasePath}/`)
    ? normalizedPath
    : `${docsRouteBasePath}${normalizedPath === '/' ? '' : normalizedPath}`;

  if (docsPath === docsRouteBasePath) {
    return `${docsRouteBasePath}/index.md`;
  }

  if (docsPath.endsWith('.md')) {
    return docsPath;
  }

  return `${docsPath}.md`;
}

function getMainContentElement(): HTMLElement | null {
  return (document.querySelector('article .markdown') ||
    document.querySelector(
      'article .theme-api-markdown',
    )) as HTMLElement | null;
}

export default function LLMActionsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<CopyStatus>('idle');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const isBrowser = useIsBrowser();
  const { pathname } = useLocation();
  const { siteConfig } = useDocusaurusContext();

  const { markdownUrl, origin } = useMemo(() => {
    const resolvedOrigin = isBrowser ? window.location.origin : siteConfig.url;
    const markdownPath = buildMarkdownPath(pathname, DOCS_ROUTE_BASE_PATH);

    return {
      origin: resolvedOrigin,
      markdownUrl: new URL(markdownPath, `${resolvedOrigin}/`).toString(),
    };
  }, [isBrowser, pathname, siteConfig.url]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleCopy = async () => {
    if (!isBrowser || status === 'copying') {
      return;
    }

    setStatus('copying');

    try {
      const contentElement = getMainContentElement();
      if (!contentElement) {
        throw new Error('Unable to locate page content.');
      }

      const markdownContent = htmlToMarkdown(contentElement, origin);
      await navigator.clipboard.writeText(markdownContent);

      setStatus('copied');
      setIsOpen(false);
      window.setTimeout(() => setStatus('idle'), COPY_SUCCESS_TIMEOUT);
    } catch (error) {
      console.error(error);
      setStatus('error');
      window.setTimeout(() => setStatus('idle'), COPY_SUCCESS_TIMEOUT);
    }
  };

  const openChatGpt = () => {
    const prompt = buildPrompt(markdownUrl);
    window.open(
      `${CHATGPT_BASE_URL}${encodeURIComponent(prompt)}`,
      '_blank',
      'noopener',
    );
  };

  const openClaude = () => {
    const prompt = buildPrompt(markdownUrl);
    window.open(
      `${CLAUDE_BASE_URL}${encodeURIComponent(prompt)}`,
      '_blank',
      'noopener',
    );
  };

  const openMarkdown = () => {
    window.open(markdownUrl, '_blank', 'noopener');
    setIsOpen(false);
  };

  const buttonLabel = (() => {
    if (status === 'copying') return 'Copiando...';
    if (status === 'copied') return 'Copiado';
    if (status === 'error') return 'Error al copiar';
    return 'Copiar página';
  })();

  const copyIconForStatus = (() => {
    if (status === 'copied') return checkIcon;
    if (status === 'error') return warningIcon;
    return copyIcon;
  })();

  return (
    <div
      className={styles.container}
      ref={dropdownRef}
    >
      <div className={styles.triggerGroup}>
        <button
          className={styles.copyButton}
          type="button"
          onClick={handleCopy}
        >
          <Icon
            icon={copyIconForStatus}
            className={styles.triggerIcon}
            aria-hidden="true"
            color={
              status === 'copied'
                ? 'var(--ifm-color-success)'
                : status === 'error'
                  ? 'var(--ifm-color-warning)'
                  : undefined
            }
          />
          <span>{buttonLabel}</span>
        </button>
        <button
          className={styles.dropdownButton}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-label="Abrir opciones"
        >
          <Icon
            icon={chevronDownIcon}
            className={isOpen ? styles.chevronOpen : styles.chevron}
            aria-hidden="true"
          />
        </button>
      </div>

      {isOpen && (
        <div
          className={styles.menu}
          role="menu"
        >
          <button
            className={styles.menuItem}
            type="button"
            onClick={handleCopy}
            role="menuitem"
          >
            <span className={styles.iconWrapper}>
              <Icon
                icon={copyIcon}
                className={styles.menuIcon}
                aria-hidden="true"
              />
            </span>
            <span className={styles.menuContent}>
              <span className={styles.menuTitle}>Copiar página</span>
              <span className={styles.menuDescription}>
                Copiar como Markdown para LLMs
              </span>
            </span>
          </button>

          <button
            className={styles.menuItem}
            type="button"
            onClick={openMarkdown}
            role="menuitem"
          >
            <span className={styles.iconWrapper}>
              <Icon
                icon={fileTextIcon}
                className={styles.menuIcon}
                aria-hidden="true"
              />
            </span>
            <span className={styles.menuContent}>
              <span className={styles.menuTitle}>Ver contenido Markdown</span>
              <span className={styles.menuDescription}>
                Abrir la version .md de esta pagina
              </span>
            </span>
            <Icon
              icon={externalLinkIcon}
              className={styles.externalIcon}
              aria-hidden="true"
            />
          </button>

          <button
            className={styles.menuItem}
            type="button"
            onClick={openChatGpt}
            role="menuitem"
          >
            <span className={styles.iconWrapper}>
              <Icon
                icon={openAiIcon}
                className={styles.menuIcon}
                aria-hidden="true"
              />
            </span>
            <span className={styles.menuContent}>
              <span className={styles.menuTitle}>Abrir en ChatGPT</span>
              <span className={styles.menuDescription}>
                Haz preguntas sobre esta pagina en Markdown
              </span>
            </span>
            <Icon
              icon={externalLinkIcon}
              className={styles.externalIcon}
              aria-hidden="true"
            />
          </button>

          <button
            className={styles.menuItem}
            type="button"
            onClick={openClaude}
            role="menuitem"
          >
            <span className={styles.iconWrapper}>
              <Icon
                icon={claudeIcon}
                className={styles.menuIcon}
                aria-hidden="true"
              />
            </span>
            <span className={styles.menuContent}>
              <span className={styles.menuTitle}>Abrir en Claude</span>
              <span className={styles.menuDescription}>
                Haz preguntas sobre esta pagina en Markdown
              </span>
            </span>
            <Icon
              icon={externalLinkIcon}
              className={styles.externalIcon}
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </div>
  );
}
