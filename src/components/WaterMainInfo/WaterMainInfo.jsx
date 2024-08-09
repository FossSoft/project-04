import AddWaterBtn from 'components/AddWaterBtn/AddWaterBtn';
import styles from './WaterMainInfo.module.css';
import Logo from 'components/Logo/Logo.jsx';
import mobx1 from '../../image/x1/transparent_bottle_for_water1_mob.png';
import mobx2 from '../../image/x2/transparent_bottle_for_water1_mob.png';
import mobx3 from '../../image/x3/transparent_bottle_for_water1_mob.png';
import tab1 from '../../image/x1/transparent_bottle_for_water1_tab.png'
import tab2 from '../../image/x2/transparent_bottle_for_water1_tab.png'
import tab3 from '../../image/x3/transparent_bottle_for_water1_tab.png'
import desk1 from '../../image/x1/transparent_bottle_for_water1.png'
import desk2 from '../../image/x2/transparent_bottle_for_water1.png'
import desk3 from '../../image/x3/transparent_bottle_for_water1.png'


const WaterMainInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <picture>
        <source
          srcSet={`${desk1} 1x, ${desk2} 2x, ${desk3} 3x`}
          media="(min-width: 1440px)"
        />
        <source
          srcSet={`${tab1} 1x, ${tab2} 2x, ${tab3} 3x`}
          media="(min-width: 768px)"
        />
        <source
          srcSet={`${mobx2} 1x, ${mobx2} 2x, ${mobx3} 3x`}
          media="(min-width: 320px)"
        />
        <img src={mobx1} alt="bottle" className={styles.bottleImg}/>
      </picture>

      <div className={styles.addWaterBtn}>
        <AddWaterBtn isPrimary={true} />
      </div>
    </div>
  );
};

export default WaterMainInfo;
