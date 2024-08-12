import Logo from 'components/Logo/Logo';
import css from './ResetPasswordPage.module.css';
import AdvantagesSection from 'components/AdvantagesSection/AdvantagesSection';
import ResetPasswordForm from 'components/ResetPasswordForm/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.box}>
          <Logo />
        </div>
        <div>
          <ResetPasswordForm />
        </div>
      </div>
      <div className={css.hideOnTablets}>
        <AdvantagesSection />
      </div>
    </div>
  );
};
export default ResetPasswordPage;