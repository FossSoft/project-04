import { useId, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Toaster, toast } from 'react-hot-toast';
import { sendEmail } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import css from './SendEmailForm.module.css';

export default function SendEmailForm() {
  const dispatch = useDispatch();
  const [emailSent, setEmailSent] = useState(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .matches('^(?!.*@[^,]*,)', 'Invalid email')
      .required('Email is required'),
  });

  const emailId = useId();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = async values => {
    try {
      const result = await dispatch(sendEmail(values)).unwrap();
      toast.success(
        'Check your email! We sent you a link to reset your password.'
      );
      setEmailSent(true);
      reset();
    } catch (error) {
      toast.error('User does not exist.');
      setEmailSent(false);
    }
  };
  return (
    <div className={css.formWrap}>
      <Toaster position="top-center" reverseOrder={false} />
      {emailSent ? (
        <p className={css.successMessage}>
          Check your email! We sent you a link to reset your password.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="on"
          className={css.form}
        >
          <h2 className={css.title}>Forgot your password?</h2>
          <div className={css.wrap}>
            <label htmlFor={emailId} className={css.label}>
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className={`${css.input} ${
                    errors.email ? css.errorInput : ''
                  }`}
                  type="email"
                  id={emailId}
                  placeholder="Enter your email"
                  autoComplete="username"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={
                    errors.email ? `${emailId}-error` : undefined
                  }
                />
              )}
            />
            {errors.email && (
              <p id={`${emailId}-error`} className={css.error}>
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={css.btn} type="submit" disabled={isSubmitting}>
            Send
          </button>
          <p className={css.text}>
            Don`t have an account?{' '}
            <Link to="/signup" className={css.link}>
              Sign Up
            </Link>
          </p>
          <p className={css.text}>
            Already registered?{' '}
            <Link to="/signin" className={css.link}>
              Sign In
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
