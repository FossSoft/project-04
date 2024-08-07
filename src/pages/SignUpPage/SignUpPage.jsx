import Logo from 'components/Logo/Logo';
import SignUpForm from 'components/SignUpForm/SignUpForm.jsx';
import css from './SignUpPage.module.css';
import AdvantagesSection from 'components/AdvantagesSection/AdvantagesSection';

const SignUpPage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.box}>
          <Logo />
        </div>
        <div>
          <SignUpForm />
        </div>
      </div>
      <div className={css.hideOnTablets}>
        <AdvantagesSection />
      </div>
    </div>
  );
};
export default SignUpPage;
