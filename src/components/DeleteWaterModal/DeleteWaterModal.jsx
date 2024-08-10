import React from 'react';
import { useDeleteWater } from '../../hooks/useWater';
import css from './DeleteWaterModal.module.css';

export default function DeleteWaterModal({ item, onClose }) {
  const { handleDelete } = useDeleteWater(item, onClose);

  return (
    <div className={css.modalContainer}>
      <h2 className={css.title}>Delete entry</h2>
      <p className={css.textQuestion}>Are you sure you want to delete the entry?</p>
      <div className={css.buttons}>
        <button className={css.deleteBtn} type="button" onClick={handleDelete}>
          Delete
        </button>
        <button className={css.cancelBtn} type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
