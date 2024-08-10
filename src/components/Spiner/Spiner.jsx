import React from 'react';
import css from './Spinner.module.css';
export const Spiner = ({ addClass = '' }) => {
  return <div className={[css.loader, addClass].join(' ')}></div>;
};
