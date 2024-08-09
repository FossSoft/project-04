import { useSelector } from 'react-redux';
import css from './TitleHello.module.css';
import { selectUserName } from '../../redux/user/selectors';

export default function TitleHello() {
  const userName = useSelector(selectUserName);

  return (
    <div className={css.text}>
      Hello,
      {!userName ? (
        <span className={css.span}>Visitor</span>
      ) : (
        <span className={css.span}>{userName}</span>
      )}
    </div>
  );
}
