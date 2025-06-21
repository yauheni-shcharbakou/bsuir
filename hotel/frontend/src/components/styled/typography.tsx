import React from 'react';
import { Typography, TypographyProps, styled } from '@mui/material';
import { StyledTypographyProps } from '../../abstractions/props';

const PrimaryTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const StyledFormHeader = styled(Typography)`
  margin: ${({ theme }) => theme.spacing(2)} 0;
  flex-grow: 1;
`;

export const PrimaryText: React.FC<StyledTypographyProps> = ({ children, component, ...props }) => {
  return (
    <PrimaryTypography component={component || 'span'} {...props}>
      {children}
    </PrimaryTypography>
  );
};

export const FormHeader: React.FC<TypographyProps> = ({ children, variant, ...props }) => {
  return (
    <StyledFormHeader variant={variant || 'h4'} {...props}>
      {children}
    </StyledFormHeader>
  );
};

export const CenteredHeader: React.FC<TypographyProps> = ({ children, variant, ...props }) => {
  return (
    <Typography component={(variant as undefined) || 'h4'} variant={variant || 'h4'} align="center">
      {children}
    </Typography>
  );
};
