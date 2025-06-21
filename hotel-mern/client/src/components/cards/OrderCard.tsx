import React, { useContext } from 'react'
import { Box, Button, Paper, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import { OrderCardProps } from '../../interfaces/props'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { Context } from '../../store'

export const OrderCard: React.FC<OrderCardProps> = ({ order, onDelete }) => {
  const { type, service } = useContext(Context)
  const { palette } = useTheme()

  const orderType = type.types.find(({ _id }) => _id === order._room._type)
  const typeName = orderType ? orderType.name : ''
  const services = service.services.filter(
    (serv) => order._services.map(({ _id }) => _id).indexOf(serv._id) !== -1
  )

  return (
    <Paper
      variant="outlined"
      sx={{
        my: 1,
        p: 2,
      }}
    >
      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Typography component="div">Date: {order.date}</Typography>
          <Typography component="div" sx={{ color: palette.success.main }}>
            {order.duty}$ per day
          </Typography>
          <Typography component="div" sx={{ color: palette.text.secondary }}>
            {order.population} persons, {typeName} type
          </Typography>
          <Typography component="div" sx={{ color: palette.text.secondary }}>
            Services: {services.map(({ name }) => name).join(', ')}
          </Typography>
        </Box>
        <Button
          color="error"
          sx={{ p: 1, alignSelf: 'center' }}
          onClick={() => onDelete(order)}
        >
          <DeleteOutlineOutlinedIcon />
        </Button>
      </Box>
    </Paper>
  )
}
