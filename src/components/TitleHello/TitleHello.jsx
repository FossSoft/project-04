import { useSelector } from 'react-redux';
import css from './TitleHello.module.css';
import { selectUserEmail, selectUserName } from '../../redux/user/selectors';

export default function TitleHello() {
  const userName = useSelector(selectUserName);
  const visitor = useSelector(selectUserEmail).split('@')[0];

  return (
    <div className={css.text}>
      Hello,
      {!userName ? (
        <span className={css.span}> {visitor}!</span>
      ) : (
        <span className={css.span}> {userName}</span>
      )}
    </div>
  );
}
