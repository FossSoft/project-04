import AddWaterBtn from 'components/AddWaterBtn/AddWaterBtn';
import styles from './WaterMainInfo.module.css';
import Logo from 'components/Logo/Logo.jsx';

const WaterMainInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <picture>
        <source
          srcset="large-image-1x.jpg 1x, large-image-2x.jpg 2x, large-image-3x.jpg 3x"
          media="(min-width: 1440px)"
        />
        <source
          srcset="medium-image-1x.jpg 1x, medium-image-2x.jpg 2x, medium-image-3x.jpg 3x"
          media="(min-width: 768px)"
        />
        <source
          srcset="../../image/x1/transparent_bottle_for_water1_mob.png 1x, ../../image/x2/transparent_bottle_for_water1_mob.png 2x, ../../image/x3/transparent_bottle_for_water1_mob.png 3x"
          media="(min-width: 320px)"
        />
        <img src="../../image/x1/transparent_bottle_for_water1_mob.png" alt="bottle" />
      </picture>

      <div className={styles.addWaterBtn}>
        <AddWaterBtn isPrimary={true} />
      </div>
    </div>
  );
};

export default WaterMainInfo;
