import { FC } from 'react';
import { BuildingFormProps } from '../../abstractions/props';
import { DefaultPaper } from '../styled/papers';
import { DefaultStack } from '../styled/stacks';
import { TextField } from '@mui/material';
import { ContainedButton } from '../styled/buttons';

const BuildingForm: FC<BuildingFormProps> = ({
  address,
  isEdit,
  isSubmitDisabled,
  onChangeAddress,
  onSubmit,
}) => {
  return (
    <DefaultPaper>
      <DefaultStack>
        <TextField
          autoComplete="off"
          label="Address"
          value={address}
          type="text"
          onChange={onChangeAddress}
        />
        <ContainedButton primary onClick={onSubmit} disabled={isSubmitDisabled}>
          {isEdit ? 'Change ' : 'Create '} building
        </ContainedButton>
      </DefaultStack>
    </DefaultPaper>
  );
};

export default BuildingForm;
