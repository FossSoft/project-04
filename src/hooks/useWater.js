import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { deleteWater, addWater } from '../redux/water/slice';
import { fetchWaterDataByDay, deleteWaterEntry } from '../redux/water/operations';
import { selectWaterItems } from '../redux/water/selectors';

const toastOptions = {
  duration: 5000,
  position: 'top-center',
  style: {
    textAlign: 'center',
    boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
  },
};

export const useWaterItem = (item) => {
  const dispatch = useDispatch();
  const { id } = item;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const handleDelete = () => {
    dispatch(deleteWater(id));
    closeDeleteModal();
  };

  return {
    isDeleteModalOpen,
    isEditModalOpen,
    openDeleteModal,
    closeDeleteModal,
    openEditModal,
    closeEditModal,
    handleDelete,
  };
};

export const useAddWater = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddWater = async (waterData) => {
    try {
      await dispatch(addWater(waterData)).unwrap();
      toast.success('Added water successfully!', toastOptions);
      closeModal();
    } catch (error) {
      toast.error(`Failed to add water: ${error.message}`, toastOptions);
    }
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleAddWater,
  };
};

export const useFetchWaterData = (selectedDate) => {
  const dispatch = useDispatch();
  const waterData = useSelector(selectWaterItems);

  useEffect(() => {
    const formattedDate = selectedDate
      ? new Date(selectedDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    if (formattedDate) {
      dispatch(fetchWaterDataByDay({ date: formattedDate }));
    }
  }, [dispatch, selectedDate]);

  return { waterData };
};

export const useDeleteWater = (item, onClose) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!item?.id) {
      toast.error('Invalid item ID', toastOptions);
      return;
    }
    try {
      await dispatch(deleteWaterEntry({ id: item.id })).unwrap();
      toast.success('Deleted water successfully!', toastOptions);
      onClose();
    } catch (error) {
      toast.error(`Failed to delete water: ${error.message}`, toastOptions);
    }
  };

  return { handleDelete };
};

