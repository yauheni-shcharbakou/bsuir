import React from 'react'
import { BuildingCardProps } from '../../interfaces/props'
import { Box, Button, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditIcon from '@mui/icons-material/Edit'

export const BuildingCard: React.FC<BuildingCardProps> = ({
  building,
  onChange,
  onDelete,
}) => {
  return (
    <Paper variant="outlined" sx={{ my: 1, p: 2 }}>
      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Typography component="div">Address: {building.address}</Typography>
          <Typography component="div">
            Rooms: {building._rooms.length}
          </Typography>
        </Box>
        <Box>
          <Button
            color="warning"
            sx={{ p: 1 }}
            onClick={() => onChange(building)}
          >
            <EditIcon />
          </Button>
          <Button
            color="error"
            sx={{ p: 1 }}
            onClick={() => onDelete(building._id)}
          >
            <DeleteOutlineOutlinedIcon />
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
