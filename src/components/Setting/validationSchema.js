import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
  // username: Yup.string().matches(
  //   /^[А-Яа-яA-Za-z]+$/,
  //   'Username must contain only letters'
  // ),
  username: Yup.string(),
  // .test('Username must contain only letters', value => {
  //   // Replace `defaultValue` with the initial value of the input field if needed
  //   const isValidInitial = !value || /^[А-Яа-яA-Za-z]+$/.test(value);
  //   // If the value is already set and valid, it should not trigger the validation error
  //   return !value || isValidInitial;
  // })
  // .max(30, 'Too long'),
  // .min(3, 'Too short')

  // .required('Username is required'),

  // .required('Name is required'),
  // userEmail: Yup.string().email('Must be a valid email!').required('Required'),
  weight: Yup.number()
    .required('Weight is required')
    .positive('Weight must be a positive number')
    .min(20, 'Weight must be at least 20kg')
    .max(300, 'Weight must be 300kg or less'),
  activeTime: Yup.number()
    .required('Write your active sport time')
    .positive('Time must be a positive number'),
  ownerResult: Yup.number(),
});
