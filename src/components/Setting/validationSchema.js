import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too short')
    .max(30, 'Too long')
    .required('Name is required'),
  userEmail: Yup.string().email('Must be a valid email!').required('Required'),
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
