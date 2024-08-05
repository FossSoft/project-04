import css from './UserBarPopover.module.css';
import clsx from 'clsx';
import sprite from '../../image/sprite/sprite.svg';

export default function UserBarPopover() {
  return (
    <div className={css.popover}>
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
