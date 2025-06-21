import { Stack, StackProps, styled } from '@mui/material';
import React from 'react';

const StyledDefaultStack = styled(Stack)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)};
`;

export const DefaultStack: React.FC<StackProps> = ({ children, spacing, ...props }) => (
  <StyledDefaultStack spacing={spacing || 1} {...props}>
    {children}
  </StyledDefaultStack>
);
