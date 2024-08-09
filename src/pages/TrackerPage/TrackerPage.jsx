import BackgroundColor from 'components/BackgroundColor/BackgraundColor';
import Layout from 'components/Layout/Layout';
import UserPanel from 'components/UserPanel/UserPanel';
import css from './TrackerPage.module.css';
import DailyInfo from 'components/DailyInfo/DailyInfo';
import WaterMainInfo from 'components/WaterMainInfo/WaterMainInfo';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserInfo } from '../../redux/user/operations';

export default function TrackerPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  return (
    <div className="container">
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
    </div>
  );
}
