import { RoomType } from '../abstractions/models';
import { RoomTypeRepository } from '../repositories';
import { ChangeEvent, useEffect, useState } from 'react';
import { DEFAULT_EDITED_ID } from '../constants/common';

export const useRoomTypeService = (initRoomTypes: RoomType[]) => {
  const roomTypeRepository = new RoomTypeRepository();

  const [roomTypes, setRoomTypes] = useState(initRoomTypes);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);
  const [editedId, setEditedId] = useState(DEFAULT_EDITED_ID);
  const [isEdit, setIsEdit] = useState(false);

  const [name, setName] = useState('');
  const [places, setPlaces] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => setIsSubmitBlocked(() => !name || !price || !places), [name, price, places]);
  useEffect(() => setIsEdit(() => editedId !== DEFAULT_EDITED_ID), [editedId]);

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(() => e.target.value);
  const changePlacesHandler = (e: ChangeEvent<HTMLInputElement>) => setPlaces(() => +e.target.value || 0);
  const changePriceHandler = (e: ChangeEvent<HTMLInputElement>) => setPrice(() => +e.target.value || 0);

  const pickHandler = (roomType: RoomType) => {
    return () => {
      setEditedId(() => roomType.id);
      setName(() => roomType.name);
      setPlaces(() => roomType.places);
      setPrice(() => roomType.price);
    };
  };

  const clearForms = () => {
    setEditedId(() => DEFAULT_EDITED_ID);
    setName(() => '');
    setPlaces(() => 0);
    setPrice(() => 0);
  };

  const submitHandler = async () => {
    try {
      const roomTypeDto: Partial<RoomType> = { name, places, price };

      const roomType: RoomType = isEdit
        ? await roomTypeRepository.update(editedId, roomTypeDto)
        : await roomTypeRepository.create(roomTypeDto);

      if (isEdit) {
        setRoomTypes(() => {
          return roomTypes.map((rt: RoomType) => {
            return rt.id === editedId ? roomType : rt;
          });
        });
      } else {
        setRoomTypes(() => [...roomTypes, roomType]);
      }

      clearForms();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteHandler = (id: number) => {
    return async () => {
      try {
        const deletedId: number = await roomTypeRepository.delete(id);
        setRoomTypes(() => roomTypes.filter(({ id: existsId }) => existsId !== deletedId));
      } catch (e) {
        console.log(e);
      }
    };
  };

  return {
    roomTypes,
    isSubmitBlocked,
    isEdit,
    name,
    places,
    price,
    changeNameHandler,
    changePlacesHandler,
    changePriceHandler,
    pickHandler,
    submitHandler,
    deleteHandler,
  };
};
