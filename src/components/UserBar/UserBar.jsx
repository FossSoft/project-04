import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import css from './UserBar.module.css';
import img1x from '../../image/x1/Ellipse_14.png';
import img2x from '../../image/x2/Ellipse_14.png';
import sprite from '../../image/sprite/sprite.svg';
import UserBarPopover from 'components/UserBarPopover/UserBarPopover';
import {
  getCurrentWidthBtn,
  hidePopover,
  togglePopover,
} from '../../redux/popover/slice';
import { selecteIcon, selecteWidth } from '../../redux/popover/selectors';
import {
  selectAvatar,
  selectUserEmail,
  selectUserName,
} from '../../redux/user/selectors';

export default function UserBar() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);
  const icon = useSelector(selecteIcon);
  const width = useSelector(selecteWidth);
  const visitor = useSelector(selectUserEmail).split('@')[0];
  const btnRef = useRef(null);

  const handleTogglePopover = () => {
    dispatch(togglePopover());
  };

  useEffect(() => {
    const updateSize = () => {
      if (btnRef.current) {
        const { width } = btnRef.current.getBoundingClientRect();
        dispatch(getCurrentWidthBtn(width));
      }
    };
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    if (btnRef.current) {
      resizeObserver.observe(btnRef.current);
    }

    return () => {
      if (btnRef.current) {
        resizeObserver.unobserve(btnRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        !e.target.closest('.popover')
      )
        dispatch(hidePopover());
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
        {userName ? (
          <p className={css.text}>{userName}</p>
        ) : (
          <p className={css.text}>{visitor}</p>
        )}

        {avatar ? (
          <img className={css.img} src={avatar} alt="User" />
        ) : (
          <img
            className={css.img}
            srcSet={`${img1x} 1x,
                  ${img2x} 2x`}
            src={`${img1x} `}
            alt="User"
          />
        )}

        <svg className={css.icon}>
          <use
            href={`${sprite}#${icon ? 'icon-chevron-up' : 'icon-chevron-down'}`}
          ></use>
        </svg>
      </button>

      <UserBarPopover style={{ width: `${width}px` }} />
    </div>
  );
}
