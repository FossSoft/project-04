import clsx from 'clsx';
import css from '../Button/Button.module.css';

export default function Button({ children, onClick, type, className }) {
  return (
    <button type={type} onClick={onClick} className={clsx(css.btn, className)}>
      {children}
    </button>
  );
}
