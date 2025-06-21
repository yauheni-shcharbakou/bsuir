import { FC } from 'react';
import { OptionFormProps } from '../../abstractions/props';
import { DefaultPaper } from '../styled/papers';
import { DefaultStack } from '../styled/stacks';
import { TextField } from '@mui/material';
import { ContainedButton } from '../styled/buttons';

const OptionForm: FC<OptionFormProps> = ({
  name,
  price,
  isEdit,
  isSubmitDisabled,
  onChangeName,
  onChangePrice,
  onSubmit,
}) => {
  return (
    <DefaultPaper>
      <DefaultStack>
        <TextField
          autoComplete="off"
          label="Name"
          value={name}
          type="text"
          onChange={onChangeName}
        />
        <TextField
          autoComplete="off"
          label="Price"
          value={price}
          type="text"
          onChange={onChangePrice}
        />
        <ContainedButton primary onClick={onSubmit} disabled={isSubmitDisabled}>
          {isEdit ? 'Change ' : 'Create '} option
        </ContainedButton>
      </DefaultStack>
    </DefaultPaper>
  );
};

export default OptionForm;
