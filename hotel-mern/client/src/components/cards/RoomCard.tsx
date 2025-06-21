import React from 'react'
import { RoomCardProps } from '../../interfaces/props'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Box, Button, useTheme } from '@mui/material'

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  clickHandler,
  onChange,
  onDelete,
  isAdmin,
}) => {
  const { palette } = useTheme()

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      onClick={() => (isAdmin ? null : clickHandler(room))}
    >
      <Paper variant="outlined" sx={{ p: 2, cursor: 'pointer' }}>
        <Box onClick={() => (isAdmin ? clickHandler(room) : null)}>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              color: palette.success.main,
              marginBottom: 2,
              textAlign: 'center',
            }}
          >
            Type: {room._type.name}
          </Typography>
          {isAdmin && (
            <Typography component="div">
              Places: {room.population}/{room._type.places}
            </Typography>
          )}
          {!isAdmin && (
            <Typography component="div">Places: {room._type.places}</Typography>
          )}
          <Typography component="div" sx={{ color: palette.text.secondary }}>
            Address:
          </Typography>
          <Typography component="div" sx={{ textDecoration: 'underline' }}>
            {room._building.address}
          </Typography>
        </Box>
        {isAdmin && (
          <>
            <Typography component="div">
              {room.isFree ? 'Free' : 'Booked'}
            </Typography>
            <Box
              sx={{
                paddingTop: 1,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {room.isFree && (
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => onChange(room._id)}
                >
                  Edit
                </Button>
              )}
              <Button
                variant="contained"
                color="error"
                onClick={() => onDelete(room._id)}
              >
                Delete
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Grid>
  )
}
