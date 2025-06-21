import React from 'react'
import { PreloaderProps } from '../interfaces/props'
import { Box, CircularProgress } from '@mui/material'

export const Preloader: React.FC<PreloaderProps> = ({ isDark }) => {
  return (
    <div className={isDark ? 'root' : 'root light'}>
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          width: '100vw',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    </div>
  )
}
