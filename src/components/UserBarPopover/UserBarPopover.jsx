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

export default function UserBarPopover() {
  const dispatch = useDispatch();
  const showPopover = useSelector(selecteShowPopover);
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
    <div className={showPopover ? 'popover active' : 'popover'}>
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

        <Modal
          isOpen={isOpenModalSettings}
          onRequestClose={handleCloseModalSettings}
        >
          <Setting />
        </Modal>
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

        <Modal
          isOpen={isOpenModalLogout}
          onRequestClose={handleCloseModalLogout}
        >
          <LogOutModal />
        </Modal>
      </div>
    </div>
  );
}

// import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import styles from './Modal.module.css';

// type ModalProps = {
//   isOpen: boolean,
//   onClose: () => void,
//   children: React.ReactNode,
// };

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
//     useEffect(() => {
//         if (isOpen) {
//             document.body.classList.add("no-scroll");
//         } else {
//             document.body.classList.remove("no-scroll");
//         }

//         return () => {
//             document.body.classList.remove("no-scroll");
//         };
//     }, [isOpen]);

//     useEffect(() => {
//         const handleEsc = (event: KeyboardEvent) => {
//             if (event.key === "Escape") {
//                 onClose();
//             }
//         };

//         document.addEventListener("keydown", handleEsc);
//         return () => document.removeEventListener("keydown", handleEsc);
//     }, [onClose]);

//     if (!isOpen) return null;

//     const handleClickOutside = (event: React.MouseEvent) => {
//         if (event.target === event.currentTarget) {
//             onClose();
//         }
//     };

//     return ReactDOM.createPortal(
//         <div className={styles.modal} onClick={handleClickOutside}>
//             {children}
//         </div>,
//         document.body
//     );
// };

// export default Modal;

// .modal {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 10000;
// }
