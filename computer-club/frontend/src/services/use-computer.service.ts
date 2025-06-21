import { ComputerPopulated } from '../abstractions/models';
import { ComputerRepository, RoomRepository } from '../repositories';
import { ChangeEvent, useEffect, useState } from 'react';
import { DEFAULT_EDITED_ID } from '../constants/common';
import { ComputerDto } from '../abstractions/dto';

export const useComputerService = (roomId: number, initComputers: ComputerPopulated[]) => {
  const computerRepository = new ComputerRepository();
  const roomRepository = new RoomRepository();

  const [computers, setComputers] = useState(initComputers);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);
  const [editedId, setEditedId] = useState(DEFAULT_EDITED_ID);
  const [isEdit, setIsEdit] = useState(false);

  const [type, setType] = useState(0);
  const [code, setCode] = useState(0);

  useEffect(() => setIsSubmitBlocked(() => !code || !type), [code, type]);
  useEffect(() => setIsEdit(() => editedId !== DEFAULT_EDITED_ID), [editedId]);

  const changeCodeHandler = (e: ChangeEvent<HTMLInputElement>) => setCode(() => +e.target.value || 0);
  const changeTypeHandler = (e: ChangeEvent<HTMLInputElement>) => setType(() => +e.target.value || 0);

  const pickHandler = (computer: ComputerPopulated) => {
    return () => {
      setEditedId(() => computer.id);
      setCode(() => computer.code);
      setType(() => computer.type.id);
    };
  };

  const clearForms = () => {
    setEditedId(() => DEFAULT_EDITED_ID);
    setCode(() => 0);
    setType(() => 0);
  };

  const submitHandler = async () => {
    try {
      const computerDto: ComputerDto = { code, type };

      if (isEdit) {
        await computerRepository.updateCode(editedId, code);
        const updatedComputer: ComputerPopulated = await computerRepository.updateType(editedId, type);

        setComputers(() =>
          computers.map((c: ComputerPopulated) => (c.id === updatedComputer.id ? updatedComputer : c)),
        );

        clearForms();
        return;
      }

      const computer: ComputerPopulated = await roomRepository.createRoomComputer(roomId, computerDto);
      setComputers(() => [...computers, computer]);
      clearForms();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteHandler = (id: number) => {
    return async () => {
      try {
        const deletedId: number = await computerRepository.delete(id);
        setComputers(() => computers.filter(({ id: existsId }) => existsId !== deletedId));
      } catch (e) {
        console.log(e);
      }
    };
  };

  return {
    computers,
    isSubmitBlocked,
    isEdit,
    code,
    type,
    changeTypeHandler,
    changeCodeHandler,
    pickHandler,
    submitHandler,
    deleteHandler,
  };
};
