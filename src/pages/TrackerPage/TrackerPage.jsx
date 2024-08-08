import BackgroundColor from 'components/BackgroundColor/BackgraundColor';
import Layout from 'components/Layout/Layout';
import UserPanel from 'components/UserPanel/UserPanel';
import css from './TrackerPage.module.css';
import DailyInfo from 'components/DailyInfo/DailyInfo';
import WaterMainInfo from 'components/WaterMainInfo/WaterMainInfo';

export default function TrackerPage() {
  return (
    <Layout>
      <BackgroundColor color="green">
        <WaterMainInfo />
      </BackgroundColor>

      <BackgroundColor color="grey">
        <div className={css.padding}>
          <UserPanel />
        </div>
        <DailyInfo />
      </BackgroundColor>

    </Layout>
  );
}
