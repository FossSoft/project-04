import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import css from './UserBarPopover.module.css';
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

export default function UserBarPopover() {
  const dispatch = useDispatch();
  const isOpenModalSettings = useSelector(selecteIsOpenModalSettings);
  const isOpenModalLogout = useSelector(selecteIsOpenModalLogout);

  const handleOpenModalSettings = () => {
    dispatch(openModalSettings());
  };

  const handleCloseModalSettings = () => {
    dispatch(closeModalSettings());
  };

  const handleOpenModalLogout = () => {
    dispatch(openModalLogout());
  };

  const handleCloseModalLogout = () => {
    dispatch(closeModalLogout());
  };

  return (
    <div className={css.popover}>
      <div className={css.container}>
        <svg className={clsx(css.icon, css.darkblue)}>
          <use href={`${sprite}#icon-settings`}></use>
        </svg>
        <button
          className={clsx(css.btn, css.darkblue)}
          onClick={handleOpenModalSettings}
          type="button"
        >
          Settigs
        </button>

        {isOpenModalSettings && (
          <Modal
            isOpen={isOpenModalSettings}
            onRequestClose={handleCloseModalSettings}
          >
            Modal window put your component with css
          </Modal>
        )}
      </div>
      <div className={css.container}>
        <svg className={clsx(css.icon, css.gray)}>
          <use href={`${sprite}#icon-log-out`}></use>
        </svg>
        <button
          className={clsx(css.btn, css.gray)}
          onClick={handleOpenModalLogout}
          type="button"
        >
          Log out
        </button>
        {isOpenModalLogout && (
          <Modal
            isOpen={isOpenModalLogout}
            onRequestClose={handleCloseModalLogout}
          >
            <LogOutModal />
          </Modal>
        )}
      </div>
    </div>
  );
}
