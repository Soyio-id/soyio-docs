import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageHeader from '../components/HomepageHeader';
import HomepageModuleSection from '../components/HomepageModuleSection';


export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Soyio docs homepage"
    >
      <HomepageHeader />
      <HomepageModuleSection />
    </Layout>
  );
}
