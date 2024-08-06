import clsx from 'clsx';
import Button from 'components/Button/Button';
import css from './LogOutModal.module.css';

export default function LogOutModal() {
  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Log out</h3>
      <p className={css.text}>Do you really want to leave?</p>
      <div className={css.btns}>
        <Button className={clsx(css.params, css.green)}>Log out</Button>
        <Button className={clsx(css.params, css.gray)}>Cancel</Button>
      </div>
    </div>
  );
}
