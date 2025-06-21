import React from 'react';
import { SpoilerProps } from '../abstractions/props';
import { AccordionDetails, AccordionSummary } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { GrowTypography } from './styled/containers';
import { StyledAccordion } from './styled/common';

export const Spoiler: React.FC<SpoilerProps> = ({ title, children }) => {
  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <GrowTypography variant="h5">{title}</GrowTypography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </StyledAccordion>
  );
};
