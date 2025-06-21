import React from 'react';
import { LinkProps } from 'next/link';
import Link from 'next/link';
import { Accordion, styled } from '@mui/material';

export const StyledAccordion = styled(Accordion)`
  margin: 0 ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.spacing(1)};
`;

export const RouteLink: React.FC<LinkProps> = ({ href, children, ...props }) => (
  <Link href={href}>
    <a>{children}</a>
  </Link>
);
