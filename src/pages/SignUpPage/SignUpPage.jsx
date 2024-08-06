import Logo from 'components/Logo/Logo';
import SignUpForm from 'components/SignUpForm/SignUpForm.jsx';
import css from './SignUpPage.module.css';

const SignUpPage = () => {
  return (
    <div className={css.container}>
      <div className={css.box}>
        <Logo />
      </div>
      <div>
        <SignUpForm />
      </div>
    </div>
  );
};
export default SignUpPage;
