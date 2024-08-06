import { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './SignUpForm.module.css';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .matches('^(?!.*@[^,]*,)', 'Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      'Password must contain at least one letter and one number'
    )
    .matches('[a-zA-Z]', 'Password can only contain Latin letters.'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Repeat Password is required'),
});

export default function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = async data => {
    if (data.password !== data.repeatPassword) {
      setError('repeatPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }
    const { repeatPassword, ...payload } = data;

    try {
      const result = await dispatch(register(payload)).unwrap();
      if (result?.data?.accessToken) {
        localStorage.setItem('token', result.data.accessToken);
        toast.success('Successfully registered!');
        navigate('/tracker');
      } else {
        toast.error('Unexpected response format');
      }
    } catch (error) {
      toast.error(error?.message || 'Registration failed');
    } finally {
      reset();
    }
  };

  return (
    <div className={css.modal}>
      <Toaster position="top-center" reverseOrder={false} />

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h2 className={css.h2}>Sign Up</h2>
        <div className={css.container}>
          <label className={css.label}>Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                className={`${css.input} ${errors.email ? css.errorInput : ''}`}
                placeholder="Enter your email"
                type="email"
                {...field}
              />
            )}
          />
          {errors.email && (
            <span className={css.errorMessage}>{errors.email.message}</span>
          )}
        </div>
        <div className={css.container}>
          <label className={css.label}>Password</label>
          <div className={css.inputWrapper}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  className={`${css.input} ${
                    errors.password ? css.errorInput : ''
                  }`}
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                />
              )}
            />

            <div
              className={css.iconeye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>
          {errors.password && (
            <span className={css.errorMessage}>{errors.password.message}</span>
          )}
        </div>
        <div className={css.container}>
          <label className={css.label}>Repeat Password</label>
          <div className={css.inputWrapper}>
            <Controller
              name="repeatPassword"
              control={control}
              render={({ field }) => (
                <input
                  className={`${css.input} ${
                    errors.repeatPassword ? css.errorInput : ''
                  }`}
                  placeholder="Please repeat password"
                  type={showRepeatPassword ? 'text' : 'password'}
                  {...field}
                />
              )}
            />
            <div
              className={css.iconeye}
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            >
              {showRepeatPassword ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>
          {errors.repeatPassword && (
            <span className={css.errorMessage}>
              {errors.repeatPassword.message}
            </span>
          )}
        </div>

        <button className={css.button} disabled={isSubmitting} type="submit">
          Sign Up
        </button>
        <div className={css.box}>
          <p className={css.text}>Already have an account?</p>
          <Link to="/signin" className={css.link}>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
