import React, { useContext, useState } from 'react'
import { Box, Container, Divider, Grid, Paper, useTheme } from '@mui/material'
import { Context } from '../store'
import Typography from '@mui/material/Typography'
import PlaceSelect from '../shared/PlaceSelect'
import { RoomInfo } from '../components/room/RoomInfo'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'
import { paths } from '../shared/enums'
import { RoomServiceContainer } from '../components/room/RoomServiceContainer'
import { Service } from '../interfaces/models'
import { RoomPriceContainer } from '../components/room/RoomPriceContainer'
import { RoomBookContainer } from '../components/room/RoomBookContainer'
import { ReviewContainer } from '../components/ReviewContainer'
import { Spoiler } from '../components/Spoiler'
import { orderClient, roomClient } from '../clients'

export const RoomPage: React.FC = observer(() => {
  const { order, service, room, basket, user, type, building } =
    useContext(Context)
  const { palette } = useTheme()
  const { push } = useHistory()

  const [price, setPrice] = useState(100)
  const [placesPrice, setPlacesPrice] = useState(50)
  const [services, setServices] = useState<string[]>([])
  const [population, setPopulation] = useState(1)

  const calcServices = (checked: boolean, servicePrice: number) => {
    if (checked) setPrice((prev) => prev + servicePrice)
    else setPrice((prev) => prev - servicePrice)
  }

  const availableServices = service.services.filter((service) => {
    return room.current._type
      ? room.current._type._services.indexOf(service._id) !== -1
      : []
  })

  const select = new PlaceSelect(
    room.current._type ? room.current._type.places : 0
  )

  const serviceHandler = (checked: boolean, service: Service) => {
    calcServices(checked, service.price)
    setServices((prev) =>
      checked ? [...prev, service._id] : prev.filter((v) => v !== service._id)
    )
  }

  const selectHandler = (value: string) => {
    setPlacesPrice(parseInt(value) * 50)
    setPopulation(parseInt(value))
  }

  const bookHandler = () =>
    orderClient.create(
      services,
      price + placesPrice,
      population,
      order,
      basket,
      user,
      room,
      () => {
        roomClient.updateAll(1, room, building, type, user, () =>
          push(paths.main)
        )
      }
    )

  return (
    <Container maxWidth="sm">
      <Paper
        variant="outlined"
        component="div"
        sx={{ flexGrow: 1, p: 2, marginTop: 2 }}
      >
        <RoomInfo room={room.current} />
        <Spoiler title="Book room">
          <RoomPriceContainer value={price + placesPrice} />
          <Divider />
          <Box component="form" noValidate autoComplete="off" sx={{ py: 1 }}>
            <Typography
              component="h6"
              variant="h6"
              sx={{ color: palette.primary.main }}
            >
              Book a room
            </Typography>
            <Grid container>
              <RoomServiceContainer
                services={availableServices}
                checked={services}
                onChange={serviceHandler}
              />
              <RoomBookContainer
                selectOptions={select.options}
                selectValues={select.values}
                selectValue={population}
                selectHandler={selectHandler}
                bookHandler={bookHandler}
              />
            </Grid>
          </Box>
        </Spoiler>
        <Spoiler title="Reviews">
          <ReviewContainer />
        </Spoiler>
      </Paper>
    </Container>
  )
})
