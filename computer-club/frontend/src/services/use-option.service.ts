import { Option } from '../abstractions/models';
import { OptionRepository } from '../repositories';
import { ChangeEvent, useEffect, useState } from 'react';
import { DEFAULT_EDITED_ID } from '../constants/common';

export const useOptionService = (initOptions: Option[]) => {
  const optionRepository = new OptionRepository();

  const [options, setOptions] = useState(initOptions);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);
  const [editedId, setEditedId] = useState(DEFAULT_EDITED_ID);
  const [isEdit, setIsEdit] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => setIsSubmitBlocked(() => !name || !price), [name, price]);
  useEffect(() => setIsEdit(() => editedId !== DEFAULT_EDITED_ID), [editedId]);

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(() => e.target.value);
  const changeDescriptionHandler = (e: ChangeEvent<HTMLInputElement>) => setDescription(() => e.target.value);
  const changePriceHandler = (e: ChangeEvent<HTMLInputElement>) => setPrice(() => +e.target.value || 0);

  const pickHandler = (option: Option) => {
    return () => {
      setEditedId(() => option.id);
      setName(() => option.name);
      setDescription(() => option.description);
      setPrice(() => option.price);
    };
  };

  const clearForms = () => {
    setEditedId(() => DEFAULT_EDITED_ID);
    setName(() => '');
    setDescription(() => '');
    setPrice(() => 0);
  };

  const submitHandler = async () => {
    try {
      const optionDto: Partial<Option> = { name, description, price };

      const option: Option = isEdit
        ? await optionRepository.update(editedId, optionDto)
        : await optionRepository.create(optionDto);

      if (isEdit) {
        setOptions(() => {
          return options.map((o: Option) => {
            return o.id === editedId ? option : o;
          });
        });
      } else {
        setOptions(() => [...options, option]);
      }

      clearForms();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteHandler = (id: number) => {
    return async () => {
      try {
        const deletedId: number = await optionRepository.delete(id);
        setOptions(() => options.filter(({ id: existsId }) => existsId !== deletedId));
      } catch (e) {
        console.log(e);
      }
    };
  };

  return {
    options,
    isSubmitBlocked,
    isEdit,
    name,
    description,
    price,
    changeNameHandler,
    changeDescriptionHandler,
    changePriceHandler,
    pickHandler,
    submitHandler,
    deleteHandler,
  };
};
