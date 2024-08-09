import WelcomeSection from 'components/WelcomeSection/WelcomeSection';
import AdvantagesSection from 'components/AdvantagesSection/AdvantagesSection';
import Layout from 'components/Layout/Layout';
import BackgroundColor from 'components/BackgroundColor/BackgraundColor';
import { EditWaterModal } from 'components/EditWaterModal/EditWaterModal.jsx';
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
