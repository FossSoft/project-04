import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import css from './UserBarPopover.module.css';
import './UserBarPopover.css';
import sprite from '../../image/sprite/sprite.svg';
import Modal from 'components/Modal/Modal';
import {
  selecteIsOpenModalLogout,
  selecteIsOpenModalSettings,
} from '../../redux/modal/selector';
import {
  closeModalLogout,
  closeModalSettings,
  openModalLogout,
  openModalSettings,
} from '../../redux/modal/slice';
import LogOutModal from 'components/LogOutModal/LogOutModal';
import { Setting } from 'components/Setting/Setting.jsx';
import { selecteShowPopover } from '../../redux/popover/selectors';
import { hidePopover } from '../../redux/popover/slice';

export default function UserBarPopover({ style }) {
  const dispatch = useDispatch();
  const showPopover = useSelector(selecteShowPopover);
  const isOpenModalSettings = useSelector(selecteIsOpenModalSettings);
  const isOpenModalLogout = useSelector(selecteIsOpenModalLogout);
  const closeButtonPosition =
    window.innerWidth > 768
      ? { right: '40px', top: '40px' }
      : { right: '16px', top: '20px' };

  const handleOpenModalSettings = () => {
    dispatch(openModalSettings());
    dispatch(hidePopover());
  };

  const handleCloseModalSettings = () => {
    dispatch(closeModalSettings());
  };

  const handleOpenModalLogout = () => {
    dispatch(openModalLogout());
    dispatch(hidePopover());
  };

  const handleCloseModalLogout = () => {
    dispatch(closeModalLogout());
  };

  return (
    <div>
      <div className={showPopover ? 'popover active' : 'popover'} style={style}>
        <button
          className={clsx(css.btn, css.darkblue)}
          onClick={handleOpenModalSettings}
          type="button"
        >
          <svg className={css.icon}>
            <use href={`${sprite}#icon-settings`}></use>
          </svg>
          Settigs
        </button>

        <button
          className={clsx(css.btn, css.gray)}
          onClick={handleOpenModalLogout}
          type="button"
        >
          <svg className={css.icon}>
            <use href={`${sprite}#icon-log-out`}></use>
          </svg>
          Log out
        </button>
      </div>
      <Modal
        isOpen={isOpenModalSettings}
        onRequestClose={handleCloseModalSettings}
        closeButtonPosition={closeButtonPosition}
      >
        <Setting />
      </Modal>
      <Modal isOpen={isOpenModalLogout} onRequestClose={handleCloseModalLogout}>
        <LogOutModal />
      </Modal>
    </div>
  );
}
