import { Box, BoxProps, styled } from '@mui/material';
import { FC } from 'react';
import { StyledBoxProps } from '../../abstractions/props';

const StyledSpaceBetweenBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const StyledCenteredRowBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCenteredColumnBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SpaceBetweenBox: FC<BoxProps> = ({ children, ...props }) => (
  <StyledSpaceBetweenBox {...props}>{children}</StyledSpaceBetweenBox>
);

export const CenteredBox: FC<StyledBoxProps> = ({ children, column, ...props }) =>
  column ? (
    <StyledCenteredColumnBox {...props}>{children}</StyledCenteredColumnBox>
  ) : (
    <StyledCenteredRowBox {...props}>{children}</StyledCenteredRowBox>
  );
