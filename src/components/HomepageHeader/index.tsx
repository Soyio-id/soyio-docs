import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading
          as="h1"
          className="hero__title"
        >
          Soyio Docs
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/integration-guide/intro"
          >
            Guías de integración →
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/api/intro"
          >
            Referencia de la API
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/user-guide/intro"
          >
            Guías de usuario
          </Link>
        </div>
      </div>
    </header>
  );
}
