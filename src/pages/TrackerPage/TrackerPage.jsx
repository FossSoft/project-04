import BackgroundColor from 'components/BackgroundColor/BackgraundColor';
import Layout from 'components/Layout/Layout';
import UserPanel from 'components/UserPanel/UserPanel';
import css from './TrackerPage.module.css';

export default function TrackerPage() {
  return (
    <Layout>
      <BackgroundColor color="grey">
        <div className={css.padding}>
          <UserPanel />
        </div>
      </BackgroundColor>
      <BackgroundColor color="green">Hello, world</BackgroundColor>
    </Layout>
  );
}
