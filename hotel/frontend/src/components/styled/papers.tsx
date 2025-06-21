import { Paper, PaperProps, styled } from '@mui/material';
import { FC } from 'react';

const StyledDefaultPaper = styled(Paper)`
  margin: ${({ theme }) => theme.spacing(1)} 0;
  padding: ${({ theme }) => theme.spacing(2)};
`;

export const DefaultPaper: FC<PaperProps> = ({ children, variant, ...props }) => (
  <StyledDefaultPaper variant={variant || 'outlined'} {...props}>
    {children}
  </StyledDefaultPaper>
);
