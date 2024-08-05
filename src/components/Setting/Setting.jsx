import css from './Setting.module.css';
import mobile from '../../image/x1/Ellipse_14.png';
import mobileX2 from '../../image/x1/Ellipse_14_640_640.png';
import tablet from '../../image/x2/Ellipse_14.png';
import tabletx2 from '../../image/x2/Ellipse_14_640_640.png';
import desktop from '../../image/x3/Ellipse_14.png';
import desktop2 from '../../image/x3/Ellipse_14_640_640.png';
import sprite from '../../image/sprite/sprite.svg';
// import normaFotot from '../images/normaFoto.png';
import { useEffect, useId, useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserActivityTime,
  selectUserEmail,
  selectUserGender,
  selectUserId,
  selectUserName,
  selectUserWaterToDrink,
  selectUserWeight,
} from '../../redux/user/selectors.js';

import { fetchUserInfo, updateUserInfo } from '../../redux/user/operations.js';
export const Setting = () => {
  const upload = useId();
  const womanRadio = useId();
  const manRadio = useId();
  const nameInput = useId();
  const emailInput = useId();
  const weightInput = useId();
  const timeInput = useId();
  const resultInput = useId();
  //
  const nameSelector = useSelector(selectUserName);
  const idSelector = useSelector(selectUserId);
  const emeailSelector = useSelector(selectUserEmail);
  const genderSelector = useSelector(selectUserGender);
  const weightSelector = useSelector(selectUserWeight);
  const activityTimeSelector = useSelector(selectUserActivityTime);
  const userWaterDrinkSelector = useSelector(selectUserWaterToDrink);
  //

  const dispatch = useDispatch();
  // console.log(dispatch);

  //
  const [files, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = event => {
    const file = event.target.files[0];
    setFile(file);

    const fileURL = URL.createObjectURL(file);

    setPreview(fileURL);
  };
  //
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  const form = useRef();
  //

  const weightValue = watch('weight');
  const timeValue = watch('activeTime');
  const [result, setResult] = useState(0);
  const genderValue = watch('gender');
  const closeForm = () => {
    form.current.style.display = 'none';
  };
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
    dispatch(fetchUserInfo())
      .unwrap()
      .then(res => console.log(res.accessToken));
    console.log('Succ');
  }, [dispatch]);

  const onSubmit = data => {
    // const formData = new FormData();
    // formData.append('username', data.username);
    // formData.append('userEmail', data.userEmail);
    // formData.append('weight', data.weight);
    // formData.append('activeTime', data.activeTime);
    // formData.append('gender', data.gender);
    console.log(data.gender);

    dispatch(updateUserInfo(data.gender))
      .unwrap()
      .then(res => console.log(res))
      .catch(err => console.log(err));

    // reset();
  };
  return (
    <div className={css.container}>
      <form ref={form} className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <svg className={css.closeIcon} onClick={closeForm}>
          <use href={`${sprite}#icon-x`}></use>
        </svg>
        <h2 className={css.titleForm}>Setting</h2>
        <div className={css.titleContainer}>
          <div className={css.uploadContaienr}>
            <img
              className={css.avatarImg}
              src={!preview ? tablet : preview}
              alt="Avatar"
              //             srcSet={`
              //   ${preview} 75w,
              //   ${preview} 150w,
              //   ${preview} 100w,
              //   ${preview} 200w,
              //   ${preview} 100w,
              //   ${preview} 200w
              // `}
              //             sizes="
              //   (min-width: 1440px) 100px,
              //   (min-width: 768px) 100px,
              //   (max-width: 767px) 75px
              // "
            />
            <label htmlFor={upload} className={css.upload}>
              <svg className={css.uploadImg}>
                <use href={`${sprite}#icon-upload`}></use>
              </svg>
              Upload a photo
              <input
                {...register('upload')}
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
                    defaultChecked
                    value="woman"
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
              <div style={{ height: 40 }}>
                {errors.username && (
                  <p className={css.error}>{errors.username.message}</p>
                )}
              </div>
              <label htmlFor={emailInput}>
                <p className={css.userEmail}>Email</p>
                <input
                  {...register('userEmail')}
                  type="text"
                  id={emailInput}
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
                  type="number"
                  defaultValue={0}
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
                  defaultValue={0}
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
                  className={css.userOwnerInput}
                  {...register('ownerResult')}
                />
              </label>
            </div>
          </div>
        </div>

        <button className={css.formBtn} type="submit">
          Save
        </button>
      </form>
      {/* {preview && (
        <div>
          <img src={preview} alt="" />
        </div>
      )} */}
    </div>
  );
};
