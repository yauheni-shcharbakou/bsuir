import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../store'
import { Box, Container, Typography } from '@mui/material'
import { BasketCard } from '../components/cards/BasketCard'
import { User } from '../interfaces/models'
import { DatePicker } from '../components/DatePicker'
import { pageButtonPaths, pageButtonTitles } from '../shared/constants'
import { PageButton } from '../components/PageButton'
import { Spoiler } from '../components/Spoiler'
import { basketClient, userClient } from '../clients'

export const AdminPage: React.FC = observer(() => {
  const { user, basket } = useContext(Context)
  const [sortDate, setSortDate] = useState(new Date())

  useEffect(() => {
    userClient.loadAll(user)
    basketClient.loadAll(basket)
  }, [])

  const deleteHandler = (basketId: string, userId: string) =>
    userClient.delete(userId, user, () => basket.deleteBasket(basketId))

  return (
    <Container sx={{ p: 2, mx: 'auto', width: 500 }}>
      <Typography component="h4" variant="h4" align="center">
        Admin panel
      </Typography>
      <Spoiler title="Users">
        <Box sx={{ py: 1, display: 'flex', justifyContent: 'center' }}>
          <DatePicker onChange={(value) => setSortDate(value || new Date())} />
        </Box>
        {basket.baskets.map((currentBasket) => (
          <BasketCard
            key={currentBasket._id}
            basket={currentBasket}
            sortDate={sortDate}
            onChangeRole={(currentUser: User) =>
              userClient.changeRole(currentUser, user)
            }
            onDelete={deleteHandler}
          />
        ))}
      </Spoiler>
      <Box
        sx={{
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
        }}
      >
        {pageButtonTitles.map((title, index) => (
          <PageButton key={title} title={title} path={pageButtonPaths[index]} />
        ))}
      </Box>
    </Container>
  )
})
