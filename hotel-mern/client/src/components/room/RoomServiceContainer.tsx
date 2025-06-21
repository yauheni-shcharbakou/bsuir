import React from 'react'
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
import { RoomServiceContainerProps } from '../../interfaces/props'

export const RoomServiceContainer: React.FC<RoomServiceContainerProps> = ({
  services,
  checked,
  onChange,
}) => {
  return (
    <Grid item md={6}>
      <FormGroup>
        {services.map((service) => (
          <FormControlLabel
            control={<Checkbox />}
            key={service._id}
            label={service.name}
            checked={checked.includes(service._id)}
            onChange={(e, checked) => onChange(checked, service)}
          />
        ))}
      </FormGroup>
    </Grid>
  )
}
