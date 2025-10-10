import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
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
  icon: any;
}

const modules: ModuleItem[] = [
  {
    title: 'Consentimiento',
    description: 'Gestiona el consentimiento de tus usuarios de forma centralizada y cumple con las regulaciones de protección de datos.',
    link: '/docs/integration-guide/consent/introduction',
    icon: consentIcon,
  },
  {
    title: 'Gestión de derechos',
    description: 'Habilita y administra solicitudes de acceso, rectificación o eliminación de datos personales.',
    link: '/docs/integration-guide/rights-management/introduction',
    icon: rightsManagementIcon,
  },
  {
    title: 'Centro de privacidad',
    description: 'Proporciona a los usuarios una interfaz centralizada para gestionar sus datos y preferencias.',
    link: '/docs/integration-guide/privacy-center/introduction',
    icon: privacyCenterIcon,
  },
  {
    title: 'Verificación de identidad',
    description: 'Valida la autenticidad y vigencia del documento y la presencia real del usuario.',
    link: '/docs/integration-guide/disclosure/introduction',
    icon: disclosureIcon,
  },
  {
    title: 'Autenticación',
    description: 'Confirma identidades previamente verificadas mediante biometría o passkeys.',
    link: '/docs/integration-guide/authentication/introduction',
    icon: authIcon,
  },
  {
    title: 'Firma electrónica',
    description: 'Solicita y gestiona la firma de documentos con respaldo de evidencia digital.',
    link: '/docs/integration-guide/signature/introduction',
    icon: signatureIcon,
  },
];

function ModuleCard({ title, description, link, icon }: ModuleItem) {
  return (
    <div className={clsx('col col--4', styles.moduleCard)}>
      <Link to={link} className={styles.moduleLink}>
        <div className={styles.moduleIcon}><img src={icon} alt={title} height={36} width={36} /></div>
        <Heading as="h3" className={styles.moduleTitle}>
          {title}
        </Heading>
        <p className={styles.moduleDescription}>{description}</p>
        <span className={styles.moduleLinkText}>Explorar módulo →</span>
      </Link>
    </div>
  );
}

export default function ModulesSection(): JSX.Element {
  return (
    <section className={styles.modules}>
      <div className="container">
        <div className="text--center">
          <Heading as="h2" className={styles.modulesTitle}>
            Nuestros módulos
          </Heading>
          <p className={styles.modulesSubtitle}>
            Integra los módulos que necesites según las necesidades de tu empresa
          </p>
        </div>
        <div className="row">
          {modules.map((module, idx) => (
            <ModuleCard key={idx} {...module} />
          ))}
        </div>
      </div>
    </section>
  );
}
