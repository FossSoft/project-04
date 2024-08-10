import css from './Setting.module.css';
import toast from 'react-hot-toast';
import avatar from '../../image/avatar.jpg';
import * as Yup from 'yup';
import sprite from '../../image/sprite/sprite.svg';
import { useEffect, useId, useRef, useState } from 'react';
import { selectIsLoading } from '../../redux/user/selectors.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserAvatar,
  selectUserEmail,
  selectUserName,
  selectUserGender,
  selectUserActivityTime,
  selectUserWeight,
} from '../../redux/user/selectors.js';
import { closeModalSettings } from '../../redux/modal/slice.js';
import {
  fetchUserInfo,
  updateUserAvatar,
  updateUserInfo,
} from '../../redux/user/operations.js';
import { Spiner } from 'components/Spiner/Spiner.jsx';

export const Setting = () => {
  const upload = useId();
  const womanRadio = useId();
  const manRadio = useId();
  const nameInput = useId();
  const emailInput = useId();
  const weightInput = useId();
  const timeInput = useId();
  const resultInput = useId();
  const activeTimeSelector = useSelector(selectUserActivityTime);
  const nameSelector = useSelector(selectUserName);
  const genderSelector = useSelector(selectUserGender);
  const weightSelector = useSelector(selectUserWeight);
  const emeailSelector = useSelector(selectUserEmail);
  const isLoading = useSelector(selectIsLoading);
  const avatarSelector = useSelector(selectUserAvatar);

  // Validation
  const validationSchema = Yup.object().shape({
    username: Yup.string().test('Username must contain only letters', value => {
      const isValidInitial = !value || /^[А-Яа-яA-Za-z]+$/.test(value);

      return !value || isValidInitial;
    }),
    weight: Yup.number()
      .required('Weight is required')
      .positive('Weight must be a positive number')

      .min(20, 'Weight must be at least 20kg')
      .max(300, 'Weight must be 300kg or less'),
    activeTime: Yup.number()
      .required('Write your active sport time')
      .max(10, 'Too much time')
      .positive('Time must be a positive number')
      .transform((value, originalValue) =>
        originalValue === '' ? null : value
      )
      .nullable(),
    ownerResult: Yup.number()
      .max(12, 'Too much')
      .nullable()
      .required('Write your result!')
      .transform((value, originalValue) =>
        originalValue === '' ? null : value
      )
      .positive('Time must be a positive number'),
  });
  // Validation
  const dispatch = useDispatch();
  const handleFileChange = event => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
    dispatch(updateUserAvatar(formData));
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  useEffect(() => {
    setValue('gender', genderSelector);
    setValue('username', nameSelector);
    setValue('activeTime', activeTimeSelector);
    setValue('weight', weightSelector);
  }, [
    genderSelector,
    setValue,
    nameSelector,
    activeTimeSelector,
    weightSelector,
  ]);
  const form = useRef();
  const weightValue = watch('weight');
  const timeValue = watch('activeTime');
  const [result, setResult] = useState(0);
  const genderValue = watch('gender');

  useEffect(() => {
    if (weightValue > 0 && weightValue < 300 && timeValue > 0) {
      if (genderValue === 'woman') {
        const mainResult = weightValue * 0.03 + timeValue * 0.4;
        setResult(mainResult.toFixed(2));
      } else {
        const mainResult = weightValue * 0.04 + timeValue * 0.6;
        setResult(mainResult.toFixed(2));
      }
    }
  }, [weightValue, timeValue, genderValue]);

  useEffect(() => {
    dispatch(fetchUserInfo()).unwrap();
  }, [dispatch]);

  const onSubmit = data => {
    dispatch(
      updateUserInfo({
        name: data.username,
        gender: data.gender,

        weight: data.weight,
        activityTime: data.activeTime,
        dailyNorma: data.ownerResult,
      })
    );
    toast.success('Successfully updated!', { duration: 1000 });
    dispatch(closeModalSettings());
  };
  return (
    <div className={css.probe}>
      <form ref={form} className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.titleForm}>Setting</h2>
        <div className={css.titleContainer}>
          <div className={css.uploadContaienr}>
            <img
              className={css.avatarImg}
              src={!avatarSelector ? avatar : avatarSelector}
              alt="Avatar"
            />
            <label htmlFor={upload} className={css.upload}>
              <svg className={css.uploadImg}>
                <use href={`${sprite}#icon-upload`}></use>
              </svg>
              Upload a photo
              <input
                name="avatar"
                type="file"
                id={upload}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
        <div className={css.descktopContainer}>
          <div>
            <div className={css.genderContainer}>
              <h3 className={css.genderTitle}>Your gender identity</h3>
              <div className={css.radioCont}>
                <label htmlFor={womanRadio} className={css.radioInput}>
                  <input
                    type="radio"
                    {...register('gender')}
                    value="woman"
                    onChange={() => {
                      setValue('gender', 'woman');
                    }}
                    id={womanRadio}
                    className={css.inputRadio}
                  />
                  Woman
                  <span></span>
                </label>

                <label htmlFor={manRadio} className={css.radioInput}>
                  <input
                    type="radio"
                    {...register('gender')}
                    value="man"
                    onChange={() => {
                      setValue('gender', 'man');
                    }}
                    id={manRadio}
                    className={css.inputRadio}
                  />
                  Man
                  <span></span>
                </label>
              </div>
            </div>
            <div className={css.userData}>
              <label htmlFor={nameInput}>
                <p className={css.userName}>Your name</p>
                <input
                  type="text"
                  {...register('username')}
                  id={nameInput}
                  placeholder="Enter your name"
                  style={{
                    borderColor: errors.username ? 'red' : 'initial',
                  }}
                />
              </label>
              <div>
                {errors.username && (
                  <p className={css.error}>{errors.username.message}</p>
                )}
              </div>
              <label htmlFor={emailInput}>
                <p className={css.userEmail}>Email</p>
                <input
                  className={css.emailInput}
                  type="text"
                  id={emailInput}
                  defaultValue={emeailSelector}
                  disabled
                  placeholder="Enter your email"
                  style={{
                    borderColor: errors.userEmail ? 'red' : 'initial',
                  }}
                />
              </label>
              <div>
                {errors.userEmail && (
                  <p className={css.error}>{errors.userEmail.message}</p>
                )}
              </div>
            </div>
            <div>
              <h3 className={css.normaTitle}>My daily norma</h3>
              <ul className={css.normaList}>
                <li className={css.apper}>
                  <p className={css.genderV}>For woman:</p>
                  <p className={css.formula}>V=(M*0,03) + (T*0,4)</p>
                </li>
                <li>
                  <p className={css.genderV}>For man:</p>
                  <p className={css.formula}>V=(M*0,04) + (T*0,6)</p>
                </li>
              </ul>
              <p className={css.normaDescription}>
                * V is the volume of the water norm in liters per day, M is your
                body weight, T is the time of active sports, or another type of
                activity commensurate in terms of loads (in the absence of
                these, you must set 0)
              </p>
              <p className={css.activeTime}>
                <svg className={css.activeIcon}>
                  <use href={`${sprite}#icon-untitled`}></use>
                </svg>
                Active time in hours
              </p>
            </div>
          </div>
          <div className={css.secondDescktopContainer}>
            <div className={css.weightTimeContainer}>
              <label htmlFor={weightInput}>
                <p className={css.weightTime}>Your weight in kilograms:</p>
                <input
                  id={weightInput}
                  {...register('weight')}
                  step="0.01"
                  defaultValue="0"
                  type="number"
                  style={{
                    borderColor: errors.weight ? 'red' : 'initial',
                  }}
                />
              </label>
              <div>
                {errors.weight && (
                  <p className={css.error}>{errors.weight.message}</p>
                )}
              </div>
              <label htmlFor={timeInput}>
                <p className={css.weightTime}>
                  The time of active participation in sports:
                </p>
                <input
                  type="number"
                  defaultValue="0"
                  step="0.01"
                  id={timeInput}
                  {...register('activeTime')}
                  style={{
                    borderColor: errors.activeTime ? 'red' : 'initial',
                  }}
                />
              </label>
              <div>
                {errors.activeTime && (
                  <p className={css.error}>{errors.activeTime.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className={css.informationResult}>
                <p className={css.requireWater}>
                  The required amount of water in liters per day:
                </p>
                <p className={css.resultText}>{result}</p>
              </div>
              <label htmlFor={resultInput}>
                <p className={css.userOwnerResult}>
                  Write down how much water you will drink:
                </p>
                <input
                  type="number"
                  id={resultInput}
                  step="0.01"
                  className={css.userOwnerInput}
                  {...register('ownerResult')}
                  style={{
                    borderColor: errors.ownerResult ? 'red' : 'initial',
                  }}
                />
              </label>
              <div>
                {errors.ownerResult && (
                  <p className={css.error}>{errors.ownerResult.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button className={css.formBtn} type="submit">
          Save
        </button>
      </form>
      {isLoading && (
        <div className={css.loaderBg}>
          <Spiner addClass={css.dataLoader} />
        </div>
      )}
    </div>
  );
};
