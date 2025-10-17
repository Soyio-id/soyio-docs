import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

import authIcon from './icons/auth.png';
import consentIcon from './icons/consent.png';
import disclosureIcon from './icons/id-verification.png';
import privacyCenterIcon from './icons/privacy-center.png';
import rightsManagementIcon from './icons/dsr.png';
import signatureIcon from './icons/signature.png';

interface ModuleItem {
  title: string;
  description: string;
  link: string;
  icon: string;
  className: string;
}

const modules: ModuleItem[] = [
  {
    title: 'Consentimiento',
    description: 'Gestiona el constimiento de tus usuarios, genera evidencias y cumple regulaciones',
    link: '/docs/integration-guide/consent/introduction',
    icon: consentIcon,
    className: styles.cardConsent,
  },
  {
    title: 'Gestión de derechos',
    description: 'Habilita y administra solicitudes de derechos, como acceso, rectificación o eliminación de datos. Responde en tiempo y forma',
    link: '/docs/integration-guide/rights-management/introduction',
    icon: rightsManagementIcon,
    className: styles.cardRights,
  },
  {
    title: 'Verificación de identidad',
    description: 'Valida documentos y presencia del usuario. Evita fraudes sin fricción',
    link: '/docs/integration-guide/disclosure/introduction',
    icon: disclosureIcon,
    className: styles.cardIdentity,
  },
  {
    title: 'Centro de privacidad',
    description: 'Un portal centralizado para que tus usuarios gestionen sus preferencias',
    link: '/docs/integration-guide/privacy-center/introduction',
    icon: privacyCenterIcon,
    className: styles.cardPrivacyCenter,
  },
  {
    title: 'Autenticación',
    description: 'Acceso simplificado con passkeys o biometría',
    link: '/docs/integration-guide/authentication/introduction',
    icon: authIcon,
    className: styles.cardAuth,
  },
  {
    title: 'Firma electrónica',
    description: 'Firma electrónica vinculante respaldada',
    link: '/docs/integration-guide/signature/introduction',
    icon: signatureIcon,
    className: styles.cardSignature,
  },
];

export default function HomepageModuleSection() {
  return (
    <section className={styles.modules}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.modulesTitle}>
            Nuestros módulos
          </Heading>
          <p className={styles.modulesSubtitle}>
            Integra los módulos que necesites según las necesidades de tu empresa
          </p>
        </div>
        <div className={styles.modulesGrid}>
          {modules.map((module) => (
            <Link
              key={module.title}
              to={module.link}
              className={`${styles.moduleCard} ${module.className}`}
              tabIndex={0}
              aria-label={`Explorar módulo ${module.title}`}
            >
              <div className={styles.moduleHero}>

              </div>
              <div className={styles.moduleBody}>
                <div className={styles.moduleIcon}>
                  <img src={module.icon} alt={module.title} height={32} width={32} />
                </div>
                <Heading as="h3" className={styles.moduleTitle}>
                  {module.title}
                </Heading>
                <p className={styles.moduleDescription}>{module.description}</p>
                <span className={styles.moduleCta}>
                  Ir a la documentación
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
