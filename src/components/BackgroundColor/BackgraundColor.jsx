import clsx from 'clsx';
import css from '../BackgroundColor/BackgraundColor.module.css';

export default function BackgroundColor({ children, color }) {
  return <div className={clsx(css.bg, css[color])}>{children}</div>;
}
