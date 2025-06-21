import React from 'react'
import { ServiceCardProps } from '../../interfaces/props'
import { Box, Button, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditIcon from '@mui/icons-material/Edit'

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onChange,
  onDelete,
}) => {
  return (
    <Paper variant="outlined" sx={{ my: 1, p: 2 }}>
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography component="div">
            {service.name}, {service.price}$ per day
          </Typography>
        </Box>
        <Box>
          <Button
            color="warning"
            sx={{ p: 1 }}
            onClick={() => onChange(service)}
          >
            <EditIcon />
          </Button>
          <Button
            color="error"
            sx={{ p: 1 }}
            onClick={() => onDelete(service._id)}
          >
            <DeleteOutlineOutlinedIcon />
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
