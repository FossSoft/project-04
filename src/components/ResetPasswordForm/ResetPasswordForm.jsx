// import css from './ResetPasswordForm.module.css';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { resetPassword } from '../../redux/auth/operations';
// import { toast, Toaster } from 'react-hot-toast';
// import { jwtDecode } from 'jwt-decode'; 
// import { FiEye, FiEyeOff } from 'react-icons/fi';

// const validationSchema = yup.object().shape({
//   password: yup
//     .string()
//     .required('Password is required')
//     .min(5, 'Password must be at least 5 characters')
//     .matches(
//       /^(?=.*[A-Za-z])(?=.*\d)/,
//       'Password must contain at least one letter and one number'
//     )
//     .matches('[a-zA-Z]', 'Password can only contain Latin letters.'),
//   repeatPassword: yup
//     .string()
//     .oneOf([yup.ref('password')], 'Passwords must match')
//     .required('Repeat Password is required'),
// });

// const ResetPasswordForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRepeatPassword, setShowRepeatPassword] = useState(false);
//   const [validToken, setValidToken] = useState(false);

//   const { token } = useParams();

//   useEffect(() => {
//     if (token) {
//       const decoded = jwtDecode(token);
//       const current = new Date();
//       if (decoded.exp * 1000 < current.getTime()) {
//         setValidToken(false);
//       } else {
//         setValidToken(true);
//       }
//     }
//   }, [token]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//     mode: 'onBlur',
//     defaultValues: {
//       password: '',
//       repeatPassword: '',
//     },
//   });

//   const onSubmit = async formData => {
//     try {
//       const reqData = {
//         password: formData.password,
//         token: token, 
//       };
//       await dispatch(resetPassword(reqData)).unwrap();
//       toast.success('Password has been successfully changed! Please sign in.');
//       reset();
//       setTimeout(() => {
//         navigate('/signin');
//       }, 1500);
//     } catch (error) {
//       toast.error(error.message || 'Failed to reset password. Please try again later.');
//     }
//   };

//   const toggleShowPassword = () => {
//     setShowPassword(prev => !prev);
//   };

//   const toggleShowRepeatPassword = () => {
//     setShowRepeatPassword(prev => !prev);
//   };

//   return (!validToken ? (
//     <div className={css.modal}>
//       <div className={css.form}>
//         <h2 className={css.h2}>Change password</h2>
//         <p className={css.errorMessage}>Sorry, your verification link has expired.</p>
//         <p className={css.errorMessage}>
//           Go to the page <Link to='/forgot-password'>Forgot password</Link>
//         </p>
//       </div>
//     </div>
//   ) : (
//     <div className={css.modal}>
//       <Toaster position="top-center" reverseOrder={false} />
//       <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
//         <h2 className={css.h2}>Change password</h2>
//         <div className={css.container}>
//           <label className={css.label}>Password</label>
//           <div className={css.inputWrapper}>
//             <input
//               className={`${css.input} ${errors.password ? css.errorInput : ''}`}
//               type={showPassword ? 'text' : 'password'}
//               {...register('password')}
//               placeholder="Enter your password"
//             />
//             <div className={css.iconeye} onClick={toggleShowPassword}>
//               {showPassword ? <FiEye size={22}/> : <FiEyeOff size={22} />}
//             </div>
//           </div>
//           {errors.password && (
//             <span className={css.errorMessage}>{errors.password.message}</span>
//           )}
//         </div>

//         <div className={css.container}>
//           <label className={css.label}>Repeat Password</label>
//           <div className={css.inputWrapper}>
//             <input
//               className={`${css.input} ${errors.repeatPassword ? css.errorInput : ''}`}
//               type={showRepeatPassword ? 'text' : 'password'}
//               {...register('repeatPassword')}
//               placeholder="Please repeat password"
//             />
//             <div className={css.iconeye} onClick={toggleShowRepeatPassword}>
//               {showRepeatPassword ? <FiEye size={22}/> : <FiEyeOff size={22}/>}
//             </div>
//           </div>
//           {errors.repeatPassword && (
//             <span className={css.errorMessage}>
//               {errors.repeatPassword.message}
//             </span>
//           )}
//         </div>

//         <button className={css.button} disabled={isSubmitting} type="submit">
//           Reset Password
//         </button>
//         <div className={css.box}>
//           <p className={css.text}>Already have an account?</p>
//           <Link to="/signin" className={css.link}>
//             Sign In
//           </Link>
//         </div>
//       </form>
//     </div>
//   ));
// };

// export default ResetPasswordForm;