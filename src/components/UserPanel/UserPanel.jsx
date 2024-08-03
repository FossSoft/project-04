import TitleHello from 'components/TitleHello/TitleHello';
import UserBar from 'components/UserBar/UserBar';
import css from './UserPanel.module.css';

export default function UserPanel() {
  return (
    <div className={css.container}>
      <TitleHello />
      <UserBar />
    </div>
  );
}
