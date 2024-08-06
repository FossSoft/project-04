import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import css from './UserBar.module.css';
import img1x from '../../image/x1/Ellipse_14.png';
import img2x from '../../image/x2/Ellipse_14.png';
import sprite from '../../image/sprite/sprite.svg';
import UserBarPopover from 'components/UserBarPopover/UserBarPopover';
import { hidePopover, togglePopover } from '../../redux/popover/slice';
import { selecteIcon, selecteShowPopover } from '../../redux/popover/selectors';
import { selectAvatar } from '../../redux/user/selectors';

export default function UserBar() {
  const dispatch = useDispatch();

  const avatar = useSelector(selectAvatar);
  const showPopover = useSelector(selecteShowPopover);
  const icon = useSelector(selecteIcon);
  const btnRef = useRef(null);

  const handleTogglePopover = () => {
    dispatch(togglePopover());
  };

  useEffect(() => {
    const handleClickOutside = e => {
      // if (
      //   btnRef.current &&
      //   !btnRef.current.contains(e.target) &&
      //   !e.target.closest('.popover')
      // )
      //   dispatch(hidePopover());
      console.log('btnRef: ', btnRef.current);
      console.log('target', e.target);
      console.log(!e.target.closest('.popover'));
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div className={css.useBar}>
      <button
        className={css.btn}
        type="button"
        ref={btnRef}
        onClick={handleTogglePopover}
      >
        <p className={css.text}>Nadia</p>
        <img
          className={css.img}
          src={avatar}
          // srcSet={`${img1x} 1x,
          //       ${img2x} 2x`}
          // src={`${img1x} `}
          alt="User"
        />

        <svg className={css.icon}>
          <use
            href={`${sprite}#${icon ? 'icon-chevron-up' : 'icon-chevron-down'}`}
          ></use>
        </svg>
      </button>
      {showPopover && <UserBarPopover className={css.userBarPopover} />}
    </div>
  );
}
