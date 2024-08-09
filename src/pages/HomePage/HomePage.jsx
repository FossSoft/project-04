import WelcomeSection from 'components/WelcomeSection/WelcomeSection';
import AdvantagesSection from 'components/AdvantagesSection/AdvantagesSection';
import Layout from 'components/Layout/Layout';
import BackgroundColor from 'components/BackgroundColor/BackgraundColor';

export default function HomePage() {
  return (
    <Layout>
      <BackgroundColor color="grey">
        <WelcomeSection />
      </BackgroundColor>
      <AdvantagesSection />
    </Layout>
  );
}
