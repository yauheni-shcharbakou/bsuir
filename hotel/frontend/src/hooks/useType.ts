import { Type, TypePopulated } from '../abstractions/models';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { typeRepository } from '../repositories';
import { addEntity, changeEntityById, deleteEntityById, errorHandler } from '../shared/common';
import { StoreContext } from '../store';

export default function useType(initialTypes: TypePopulated[]) {
  const { editStore } = useContext(StoreContext);

  const [types, setTypes] = useState<TypePopulated[]>(initialTypes);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [places, setPlaces] = useState<number | string>('');
  const [options, setOptions] = useState<number[]>([]);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(
    () => setIsSubmitBlocked(!name || !name.trim() || !price || !places),
    [name, price, places]
  );

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(() => e.target.value);
  const changePriceHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setPrice(() => +e.target.value || '');
  const changePlacesHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setPlaces(() => +e.target.value || '');

  const changeOptionsHandler = (id: number, isChecked: boolean) => {
    setOptions((prev: number[]) =>
      isChecked ? [...prev, id] : prev.filter((optionId: number) => optionId !== id)
    );
  };

  const pickTypeHandler = (type: TypePopulated) => {
    editStore.setEdited(type.id);
    setIsEdit(() => true);
    setName(() => type.name);
    setPrice(() => type.price);
    setPlaces(() => type.places);
    setOptions(() => type.options.map(({ id }) => id));
  };

  const clearForms = () => {
    editStore.setEdited();
    setIsEdit(() => false);
    setName(() => '');
    setPrice(() => '');
    setPlaces(() => '');
    setOptions(() => []);
  };

  const submitTypeHandler = async () => {
    try {
      const typeDto: Partial<Type> = { name, price: +price, places: +places, options };

      const type: TypePopulated = isEdit
        ? await typeRepository.change(editStore.getId(), typeDto)
        : await typeRepository.create(typeDto);

      setTypes(isEdit ? changeEntityById(types, type.id, type) : addEntity(types, type));
      clearForms();
    } catch (e) {
      errorHandler(e);
    }
  };

  const deleteTypeHandler = async (id: number) => {
    try {
      const deletedId: number = await typeRepository.delete(id);
      setTypes(deleteEntityById(types, deletedId));
    } catch (e) {
      errorHandler(e);
    }
  };

  return {
    types,
    checkedOptions: options,
    name,
    price,
    places,
    isSubmitBlocked,
    isEdit,
    changeNameHandler,
    changePriceHandler,
    changePlacesHandler,
    changeOptionsHandler,
    pickTypeHandler,
    submitTypeHandler,
    deleteTypeHandler,
  };
}
