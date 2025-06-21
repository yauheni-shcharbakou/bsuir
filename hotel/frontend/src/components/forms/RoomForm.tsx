import { FC } from 'react';
import { RoomFormProps } from '../../abstractions/props';
import { DefaultPaper } from '../styled/papers';
import { DefaultStack } from '../styled/stacks';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ContainedButton } from '../styled/buttons';
import { Building, TypePopulated } from '../../abstractions/models';

const RoomForm: FC<RoomFormProps> = ({
  building,
  type,
  buildings,
  types,
  isEdit,
  isSubmitDisabled,
  onChangeBuilding,
  onChangeType,
  onSubmit,
}) => {
  return (
    <DefaultPaper>
      <DefaultStack>
        <FormControl fullWidth>
          <InputLabel id="building-select">Building</InputLabel>
          <Select
            labelId="building-select"
            value={building}
            label="Building"
            onChange={onChangeBuilding}
          >
            {buildings.map((building: Building) => (
              <MenuItem key={building.id.toString(2)} value={building.id.toString()}>
                {building.address}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="type-select">Type</InputLabel>
          <Select labelId="type-select" value={type} label="Type" onChange={onChangeType}>
            {types.map((type: TypePopulated) => (
              <MenuItem key={type.id.toString(2)} value={type.id.toString()}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ContainedButton primary onClick={onSubmit} disabled={isSubmitDisabled}>
          {isEdit ? 'Change ' : 'Create '} room
        </ContainedButton>
      </DefaultStack>
    </DefaultPaper>
  );
};

export default RoomForm;
