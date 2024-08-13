import WelcomeSection from 'components/WelcomeSection/WelcomeSection';
import AdvantagesSection from 'components/AdvantagesSection/AdvantagesSection';
import Layout from 'components/Layout/Layout';
import BackgroundColor from 'components/BackgroundColor/BackgraundColor';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.container}>
      <Layout>
        <BackgroundColor color="grey">
          <WelcomeSection />
        </BackgroundColor>
        <AdvantagesSection />
      </Layout>
    </div>
  );
}
