import React from 'react'
import { SpoilerProps } from '../interfaces/props'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import Typography from '@mui/material/Typography'

export const Spoiler: React.FC<SpoilerProps> = ({ title, children }) => {
  return (
    <Accordion sx={{ my: 1, borderRadius: 1 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}
