import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import BlobSvg from './images/blob.svg';
import BigKeyImage from './images/bigkey.png';
import { useMouseParallax } from '../../hooks/useMouseParallax';

import ConsorcioSvg from './images/consorcio.svg';
import CajalosandesSvg from './images/cajalosandes.svg';
import CruzverdeSvg from './images/cruzverde.svg';
import FamilyshopSvg from './images/familyshop.svg';
import NeatSvg from './images/neat.svg';
import FraccionalSvg from './images/fraccional.svg';
import HycoSvg from './images/hyco.svg';
import MaicaoSvg from './images/maicao.svg';
import PlatanusSvg from './images/platanus.svg';
import RipleySvg from './images/ripley.svg';
import SmartfitSvg from './images/smartfit.svg';
import SbpaySvg from './images/sbpay.svg';
import SalcobrandSvg from './images/salcobrand.svg';
import SpinSvg from './images/spin.svg';

export default function HomepageHeader() {
  const { elementRef: headerRef, mousePosition } = useMouseParallax();

  const partners = [
    {
      name: 'consorcio',
      logo: ConsorcioSvg,
    },
    {
      name: 'cajalosandes',
      logo: CajalosandesSvg,
    },
    {
      name: 'cruzverde',
      logo: CruzverdeSvg,
    },
    {
      name: 'familyshop',
      logo: FamilyshopSvg,
    },
    {
      name: 'salcobrand',
      logo: SalcobrandSvg,
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
      name: 'maicao',
      logo: MaicaoSvg,
    },
    {
      name: 'platanus',
      logo: PlatanusSvg,
    },
    {
      name: 'ripley',
      logo: RipleySvg,
    },

    {
      name: 'smartfit',
      logo: SmartfitSvg,
    },
    {
      name: 'sbpay',
      logo: SbpaySvg,
    },
    {
      name: 'spin',
      logo: SpinSvg,
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
        <div className={styles.partnerLogos} aria-label="Partners using Soyio">
          <div className={styles.logoTrack}>
            {[0, 1].map((groupIndex) => (
              <div
                className={styles.logoGroup}
                key={`partner-group-${groupIndex}`}
                aria-hidden={groupIndex === 1}
              >
                {partners.map((partner) => (
                  <div className={styles.logoItem} key={`${partner.name}-${groupIndex}`}>
                    <partner.logo className={styles.partnerLogo} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
