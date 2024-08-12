import SendEmailForm from '../../components/SendEmailForm/SendEmailForm';
import Logo from '../../components/Logo/Logo';
import AdvantagesSection from 'components/AdvantagesSection/AdvantagesSection';
import css from './RecoveryPage.module.css';

export default function RecoveryLogin() {
  return (
    <div className={css.page}>
      <div className={css.wrapper}>
        <div className={css.logoBox}>
          <Logo />
        </div>
        <div className={css.container}>
          <SendEmailForm />
        </div>
      </div>
      <div className={css.imageWrapper}>
        <AdvantagesSection />
      </div>
    </div>
  );
}
