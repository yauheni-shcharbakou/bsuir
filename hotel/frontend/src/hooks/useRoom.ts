import { Room, RoomPopulated } from '../abstractions/models';
import { useContext, useEffect, useState } from 'react';
import { roomRepository } from '../repositories';
import { addEntity, changeEntityById, deleteEntityById, errorHandler } from '../shared/common';
import { StoreContext } from '../store';
import { SelectChangeEvent } from '@mui/material';

export default function useRoom(initialRooms: RoomPopulated[]) {
  const { editStore } = useContext(StoreContext);

  const [rooms, setRooms] = useState<RoomPopulated[]>(initialRooms);
  const [building, setBuilding] = useState('');
  const [type, setType] = useState('');
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => setIsSubmitBlocked(!building || !type), [building, type]);

  const changeBuildingHandler = (e: SelectChangeEvent) => setBuilding(() => e.target.value);
  const changeTypeHandler = (e: SelectChangeEvent) => setType(() => e.target.value);

  const pickRoomHandler = (room: RoomPopulated) => {
    editStore.setEdited(room.id);
    setIsEdit(() => true);
    setBuilding(() => room.building.id.toString());
    setType(() => room.type.id.toString());
  };

  const clearForms = () => {
    editStore.setEdited();
    setIsEdit(() => false);
    setBuilding(() => '');
    setType(() => '');
  };

  const submitRoomHandler = async () => {
    try {
      const roomDto: Partial<Room> = { building: +building, type: +type };

      const room: RoomPopulated = isEdit
        ? await roomRepository.change(editStore.getId(), roomDto)
        : await roomRepository.create(roomDto);

      setRooms(isEdit ? changeEntityById(rooms, room.id, room) : addEntity(rooms, room));
      clearForms();
    } catch (e) {
      errorHandler(e);
    }
  };

  const deleteRoomHandler = async (id: number) => {
    try {
      const deletedId: number = await roomRepository.delete(id);
      setRooms(deleteEntityById(rooms, deletedId));
    } catch (e) {
      errorHandler(e);
    }
  };

  return {
    rooms,
    building,
    type,
    isSubmitBlocked,
    isEdit,
    changeBuildingHandler,
    changeTypeHandler,
    pickRoomHandler,
    submitRoomHandler,
    deleteRoomHandler,
  };
}
