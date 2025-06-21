import { RoomPopulated } from '../abstractions/models';
import { RoomRepository } from '../repositories';
import { ChangeEvent, useEffect, useState } from 'react';
import { DEFAULT_EDITED_ID } from '../constants/common';
import { RoomDto } from '../abstractions/dto';

export const useRoomService = (initRooms: RoomPopulated[]) => {
  const roomRepository = new RoomRepository();

  const [rooms, setRooms] = useState(initRooms);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);
  const [editedId, setEditedId] = useState(DEFAULT_EDITED_ID);
  const [isEdit, setIsEdit] = useState(false);

  const [name, setName] = useState('');
  const [type, setType] = useState(0);

  useEffect(() => setIsSubmitBlocked(() => !name || !type), [name, type]);
  useEffect(() => setIsEdit(() => editedId !== DEFAULT_EDITED_ID), [editedId]);

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(() => e.target.value);
  const changeTypeHandler = (e: ChangeEvent<HTMLInputElement>) => setType(() => +e.target.value || 0);

  const pickHandler = (room: RoomPopulated) => {
    return () => {
      setEditedId(() => room.id);
      setName(() => room.name);
      setType(() => room.type.id);
    };
  };

  const clearForms = () => {
    setEditedId(() => DEFAULT_EDITED_ID);
    setName(() => '');
    setType(() => 0);
  };

  const submitHandler = async () => {
    try {
      const roomDto: Partial<RoomDto> = { name, type };

      const room: RoomPopulated = isEdit
        ? await roomRepository.update(editedId, roomDto)
        : await roomRepository.create(roomDto);

      if (isEdit) {
        setRooms(() => {
          return rooms.map((r: RoomPopulated) => {
            return r.id === editedId ? room : r;
          });
        });
      } else {
        setRooms(() => [...rooms, room]);
      }

      clearForms();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteHandler = (id: number) => {
    return async () => {
      try {
        const deletedId: number = await roomRepository.delete(id);
        setRooms(() => rooms.filter(({ id: existsId }) => existsId !== deletedId));
      } catch (e) {
        console.log(e);
      }
    };
  };

  return {
    rooms,
    isSubmitBlocked,
    isEdit,
    name,
    type,
    changeNameHandler,
    changeTypeHandler,
    pickHandler,
    submitHandler,
    deleteHandler,
  };
};
