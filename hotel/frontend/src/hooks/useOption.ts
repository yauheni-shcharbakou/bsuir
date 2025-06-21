import { Option } from '../abstractions/models';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { optionRepository } from '../repositories';
import { addEntity, changeEntityById, deleteEntityById, errorHandler } from '../shared/common';
import { StoreContext } from '../store';

export default function useOption(initialOptions: Option[]) {
  const { editStore } = useContext(StoreContext);

  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => setIsSubmitBlocked(!name || !price), [name, price]);

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(() => e.target.value);
  const changePriceHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setPrice(() => +e.target.value || '');

  const pickOptionHandler = (option: Option) => {
    editStore.setEdited(option.id);
    setIsEdit(() => true);
    setName(() => option.name);
    setPrice(() => option.price);
  };

  const clearForms = () => {
    editStore.setEdited();
    setIsEdit(() => false);
    setName(() => '');
    setPrice(() => '');
  };

  const submitOptionHandler = async () => {
    try {
      const optionDto: Partial<Option> = { name, price: +price };

      const option: Option = isEdit
        ? await optionRepository.change(editStore.getId(), optionDto)
        : await optionRepository.create(optionDto);

      setOptions(
        isEdit ? changeEntityById(options, option.id, option) : addEntity(options, option)
      );
      clearForms();
    } catch (e) {
      errorHandler(e);
    }
  };

  const deleteOptionHandler = async (id: number) => {
    try {
      const deletedId: number = await optionRepository.delete(id);
      setOptions(deleteEntityById(options, deletedId));
    } catch (e) {
      errorHandler(e);
    }
  };

  return {
    options,
    name,
    price,
    isSubmitBlocked,
    isEdit,
    changeNameHandler,
    changePriceHandler,
    pickOptionHandler,
    submitOptionHandler,
    deleteOptionHandler,
  };
}
