import clsx from 'clsx';
import css from './Modal.module.css';
import sprite from '../../image/sprite/sprite.svg';

// children=Modal window put your component with css.

export default function Modal({ children, style, isOpen, onRequestClose }) {
  const handleModalClick = e => {
    e.stopPropagation();
  };
  console.log(isOpen);
  return (
    <div
      className={isOpen ? clsx(css.backdrop, css.active) : css.backdrop}
      onClick={onRequestClose}
    >
      <div
        className={clsx(css.modal, { [css.active]: isOpen })}
        style={style}
        onClick={handleModalClick}
      >
        <button className={css.btn} onClick={onRequestClose}>
          <svg className={css.icon}>
            <use href={`${sprite}#icon-x`}></use>
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
}
