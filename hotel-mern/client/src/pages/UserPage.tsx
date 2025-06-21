import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Container, Paper, Typography } from '@mui/material'
import { Context } from '../store'
import { OrderCard } from '../components/cards/OrderCard'
import { OrderPopulated } from '../interfaces/populatedModels'
import { orderClient, serviceClient } from '../clients'

export const UserPage: React.FC = observer(() => {
  const { service, order, basket, user } = useContext(Context)
  const [duty, setDuty] = useState(0)

  useEffect(() => {
    serviceClient.loadAll(service)
    orderClient.loadAll(basket, order, (orders) =>
      setDuty(orders.reduce((acc, { duty }) => acc + duty, 0))
    )
  }, [])

  const deleteOrder = (currentOrder: OrderPopulated) =>
    orderClient.delete(currentOrder._id, order, () =>
      setDuty((prev) => prev - currentOrder.duty)
    )

  return (
    <Container sx={{ p: 2, mx: 'auto', width: 500 }}>
      <Typography component="h4" variant="h4" align="center">
        User panel
      </Typography>
      <Paper variant="outlined" sx={{ my: 1, p: 2, textAlign: 'center' }}>
        <Typography component="h6" variant="h6">
          E-mail: {user.user.email}
        </Typography>
        <Typography component="div" variant="body1">
          Role: {user.user.role}
        </Typography>
        <Typography component="div" variant="body1">
          {duty}$ per day
        </Typography>
      </Paper>
      <Typography component="h4" variant="h4" align="center">
        Orders
      </Typography>
      {order.orders.length ? (
        order.orders.map((order) => (
          <OrderCard order={order} key={order._id} onDelete={deleteOrder} />
        ))
      ) : (
        <Box sx={{ py: 2, textAlign: 'center' }}>No orders</Box>
      )}
    </Container>
  )
})
