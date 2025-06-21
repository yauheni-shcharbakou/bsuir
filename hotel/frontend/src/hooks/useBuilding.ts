import { Building } from '../abstractions/models';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { buildingRepository } from '../repositories';
import { addEntity, changeEntityById, deleteEntityById, errorHandler } from '../shared/common';
import { StoreContext } from '../store';

export default function useBuilding(initialBuildings: Building[]) {
  const { editStore } = useContext(StoreContext);

  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [address, setAddress] = useState('');
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => setIsSubmitBlocked(!address || !address.trim()), [address]);

  const changeAddressHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setAddress(() => e.target.value);

  const pickBuildingHandler = (building: Building) => {
    editStore.setEdited(building.id);
    setIsEdit(() => true);
    setAddress(() => building.address);
  };

  const clearForms = () => {
    editStore.setEdited();
    setIsEdit(() => false);
    setAddress(() => '');
  };

  const submitBuildingHandler = async () => {
    try {
      const building: Building = isEdit
        ? await buildingRepository.change(editStore.getId(), { address })
        : await buildingRepository.create({ address });

      setBuildings(
        isEdit ? changeEntityById(buildings, building.id, building) : addEntity(buildings, building)
      );
      clearForms();
    } catch (e) {
      errorHandler(e);
    }
  };

  const deleteBuildingHandler = async (id: number) => {
    try {
      const deletedId: number = await buildingRepository.delete(id);
      setBuildings(deleteEntityById(buildings, deletedId));
    } catch (e) {
      errorHandler(e);
    }
  };

  return {
    buildings,
    address,
    isSubmitBlocked,
    isEdit,
    changeAddressHandler,
    pickBuildingHandler,
    submitBuildingHandler,
    deleteBuildingHandler,
  };
}
