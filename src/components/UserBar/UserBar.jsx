import css from './UserBar.module.css';
import img1x from '../../image/x1/Ellipse_14.png';
import img2x from '../../image/x2/Ellipse_14.png';
import sprite from '../../image/sprite/sprite.svg';
import UserBarPopover from 'components/UserBarPopover/UserBarPopover';

export default function UserBar() {
  return (
    <>
      <button className={css.btn} type="button">
        <p className={css.text}>Nadia</p>
        <img
          className={css.img}
          srcset={`${img1x} 1x,
                ${img2x} 2x`}
          src={`${img1x} `}
          alt="User"
        />
        <svg className={css.iconDown}>
          <use href={`${sprite}#icon-chevron-down`}></use>
        </svg>
        {/* <svg className={css.iconUp}>
        <use href={`${sprite}#icon-chevron-up`}></use>
      </svg> */}
      </button>
      <UserBarPopover />
    </>
  );
}
