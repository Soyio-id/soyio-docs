import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import BlobSvg from './images/blob.svg';
import BigKeyImage from './images/bigkey.png';

import ConsorcioSvg from './images/consorcio.svg';
import NeatSvg from './images/neat.svg';
import FraccionalSvg from './images/fraccional.svg';
import HycoSvg from './images/hyco.svg';
import PlatanusSvg from './images/platanus.svg';
import SmartfitSvg from './images/smartfit.svg';
import SbpaySvg from './images/sbpay.svg';

export default function HomepageHeader() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const normalizedX = (x - 0.5) * 2;
        const normalizedY = (y - 0.5) * 2;

        setMousePosition({
          x: normalizedX * 50,
          y: normalizedY * 50
        });
      }
    };

    const headerElement = headerRef.current;
    if (headerElement) {
      headerElement.addEventListener('mousemove', handleMouseMove);

      return () => {
        headerElement.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  const partners = [
    {
      name: 'consorcio',
      logo: ConsorcioSvg,
    },
    {
      name: 'neat',
      logo: NeatSvg,
    },
    {
      name: 'fraccional',
      logo: FraccionalSvg,
    },
    {
      name: 'hyco',
      logo: HycoSvg,
    },
    {
      name: 'platanus',
      logo: PlatanusSvg,
    },
    {
      name: 'smartfit',
      logo: SmartfitSvg,
    },
    {
      name: 'sbpay',
      logo: SbpaySvg,
    },
  ];
  return (
    <header ref={headerRef} className={clsx(styles.heroBanner)}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <Heading
              as="h1"
              className={styles.title}
            >
              El nuevo estándar de{' '}
              <span className={styles.gradientText}>privacidad digital</span>
            </Heading>
            <p className={styles.subtitle}>
              Construye productos privados que generan confianza, convierten y cumplen con las regulaciones
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.primaryButton}
                to="/docs/integration-guide/intro"
              >
                Empezar la integración →
              </Link>
              <Link
                className={styles.secondaryButton}
                to="/docs/user-guide/faq"
              >
                Preguntas frecuentes
              </Link>
            </div>
            <div
              className={styles.blobContainer}
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
              }}
            >
              <BlobSvg className={styles.blob} />
            </div>
          </div>
          <div className={styles.imageContent}>
            <img
              src={BigKeyImage}
              alt="Key graphic"
              className={styles.keyImage}
            />
          </div>
        </div>
        <div className={styles.partnerLogos}>
          {partners.map((partner) => (
            <div className={styles.logoItem} key={partner.name}>
              <partner.logo className={styles.partnerLogo} />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
