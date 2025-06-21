import React from 'react';
import { AuthFormProps } from '../../abstractions/props';
import { FormHeader } from '../styled/typography';
import { TextField } from '@mui/material';

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  changeEmailHandler,
  changePasswordHandler,
}) => {
  return (
    <>
      <FormHeader>{title}</FormHeader>
      <TextField
        label="E-mail"
        type="email"
        autoComplete="current-email"
        onChange={changeEmailHandler}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={changePasswordHandler}
      />
    </>
  );
};

export default AuthForm;
