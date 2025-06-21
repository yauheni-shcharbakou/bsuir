import React from 'react'
import Typography from '@mui/material/Typography'
import { Box, useTheme } from '@mui/material'
import { RoomPriceContainerProps } from '../../interfaces/props'

export const RoomPriceContainer: React.FC<RoomPriceContainerProps> = ({
  value,
}) => {
  const { palette } = useTheme()

  return (
    <Box component="div" sx={{ marginBottom: 2 }}>
      <Typography component="h6" variant="h6" sx={{ marginBottom: 1 }}>
        Pricing
      </Typography>
      <Typography
        component="div"
        variant="button"
        sx={{ color: palette.success.main }}
      >
        {value}$ per day
      </Typography>
    </Box>
  )
}
