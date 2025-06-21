import { ComputerType } from '../abstractions/models';
import { ComputerTypeRepository } from '../repositories';
import { ChangeEvent, useEffect, useState } from 'react';
import { DEFAULT_EDITED_ID } from '../constants/common';

export const useComputerTypeService = (initComputerTypes: ComputerType[]) => {
  const computerTypeRepository = new ComputerTypeRepository();

  const [computerTypes, setComputerTypes] = useState(initComputerTypes);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);
  const [editedId, setEditedId] = useState(DEFAULT_EDITED_ID);
  const [isEdit, setIsEdit] = useState(false);

  const [name, setName] = useState('');
  const [cpu, setCpu] = useState('');
  const [gpu, setGpu] = useState('');
  const [ram, setRam] = useState('');

  useEffect(() => setIsSubmitBlocked(() => !name), [name]);
  useEffect(() => setIsEdit(() => editedId !== DEFAULT_EDITED_ID), [editedId]);

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(() => e.target.value);
  const changeCpuHandler = (e: ChangeEvent<HTMLInputElement>) => setCpu(() => e.target.value);
  const changeGpuHandler = (e: ChangeEvent<HTMLInputElement>) => setGpu(() => e.target.value);
  const changeRamHandler = (e: ChangeEvent<HTMLInputElement>) => setRam(() => e.target.value);

  const pickHandler = (computerType: ComputerType) => {
    return () => {
      setEditedId(() => computerType.id);
      setName(() => computerType.name);
      setCpu(() => computerType.cpu);
      setGpu(() => computerType.gpu);
      setRam(() => computerType.ram);
    };
  };

  const clearForms = () => {
    setEditedId(() => DEFAULT_EDITED_ID);
    setName(() => '');
    setCpu(() => '');
    setGpu(() => '');
    setRam(() => '');
  };

  const submitHandler = async () => {
    try {
      const computerTypeDto: Partial<ComputerType> = { name, cpu, gpu, ram };

      const computerType: ComputerType = isEdit
        ? await computerTypeRepository.update(editedId, computerTypeDto)
        : await computerTypeRepository.create(computerTypeDto);

      if (isEdit) {
        setComputerTypes(() => {
          return computerTypes.map((ct: ComputerType) => {
            return ct.id === editedId ? computerType : ct;
          });
        });
      } else {
        setComputerTypes(() => [...computerTypes, computerType]);
      }

      clearForms();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteHandler = (id: number) => {
    return async () => {
      try {
        const deletedId: number = await computerTypeRepository.delete(id);
        setComputerTypes(() => computerTypes.filter(({ id: existsId }) => existsId !== deletedId));
      } catch (e) {
        console.log(e);
      }
    };
  };

  return {
    computerTypes,
    isSubmitBlocked,
    isEdit,
    name,
    cpu,
    gpu,
    ram,
    changeNameHandler,
    changeCpuHandler,
    changeGpuHandler,
    changeRamHandler,
    pickHandler,
    submitHandler,
    deleteHandler,
  };
};
