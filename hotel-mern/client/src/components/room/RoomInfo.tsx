import React from 'react'
import Typography from '@mui/material/Typography'
import { Box, useTheme } from '@mui/material'
import { RoomInfoProps } from '../../interfaces/props'

export const RoomInfo: React.FC<RoomInfoProps> = ({ room }) => {
  const { palette } = useTheme()

  return (
    <Box component="article" sx={{ p: 1 }}>
      <Typography
        component="h2"
        variant="h2"
        sx={{ textAlign: 'center', marginBottom: 2 }}
      >
        Room info
      </Typography>
      <Typography
        component="h6"
        variant="h6"
        sx={{ color: palette.primary.main }}
      >
        Type: {room._type.name}
      </Typography>
      <Typography component="h6" variant="h6">
        Places: {room._type.places}
      </Typography>
      <Typography component="div" sx={{ color: palette.text.secondary }}>
        Address: {room._building.address}
      </Typography>
    </Box>
  )
}
