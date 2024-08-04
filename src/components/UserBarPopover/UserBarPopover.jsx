import css from './UserBarPopover.module.css';
import clsx from 'clsx';
import sprite from '../../image/sprite/sprite.svg';
// import { useDispatch } from 'react-redux';
// import { openPopover } from '../../redux/popover/slice';

export default function UserBarPopover() {
  // const dispatch = useDispatch();
  // // const showPopover = useSelector(selecteShowPopover);

  // const handleOpenPopover = () => {
  //   dispatch(openPopover());
  // };
  // onClick = { handleOpenPopover };
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <svg className={clsx(css.icon, css.darkblue)}>
          <use href={`${sprite}#icon-settings`}></use>
        </svg>
        <button className={clsx(css.btn, css.darkblue)} type="button">
          Settigs
        </button>
      </div>
      <div className={css.container}>
        <svg className={clsx(css.icon, css.gray)}>
          <use href={`${sprite}#icon-log-out`}></use>
        </svg>
        <button className={clsx(css.btn, css.gray)} type="button">
          Log out
        </button>
      </div>
    </div>
  );
}
