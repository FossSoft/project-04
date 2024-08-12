import ChooseDate from 'components/ChooseDate/ChooseDate';
import AddWaterBtn from 'components/AddWaterBtn/AddWaterBtn';
import WaterList from 'components/WaterList/WaterList';
import css from './DailyInfo.module.css'

export default function DailyInfo() {
  return (
    <div className={css.containerDailyInfo}>
      <div className={css.dataContainer}>
        <ChooseDate />
        <AddWaterBtn isPrimary={false} />
      </div>
      <WaterList />
    </div>
  );
}

