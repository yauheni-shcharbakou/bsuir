import { FC } from 'react';
import { UserFormProps } from '../../abstractions/props';
import { DefaultPaper } from '../styled/papers';
import { DefaultStack } from '../styled/stacks';
import { TextField } from '@mui/material';
import { ContainedButton } from '../styled/buttons';

const UserForm: FC<UserFormProps> = ({
  email,
  password,
  isEdit,
  isSubmitDisabled,
  onChangeEmail,
  onChangePassword,
  onSubmit,
}) => {
  return (
    <DefaultPaper>
      <DefaultStack>
        <TextField
          label="E-mail"
          value={email}
          type="text"
          autoComplete="current-email"
          onChange={onChangeEmail}
        />
        <TextField
          label="Password"
          value={password}
          type="password"
          autoComplete="current-password"
          onChange={onChangePassword}
        />
        <ContainedButton primary onClick={onSubmit} disabled={isSubmitDisabled || !isEdit}>
          {isEdit ? 'Change ' : 'Create '} user
        </ContainedButton>
      </DefaultStack>
    </DefaultPaper>
  );
};

export default UserForm;
