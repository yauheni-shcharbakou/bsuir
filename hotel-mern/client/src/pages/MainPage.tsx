import React, { useContext, useEffect } from 'react'
import { Grid, useTheme } from '@mui/material'
import { FilterBar } from '../components/FilterBar'
import { RoomGrid } from '../components/room/RoomGrid'
import { Context } from '../store'
import { roles } from '../shared/enums'
import { observer } from 'mobx-react-lite'
import { RoomCreateForm } from '../components/room/RoomCreateForm'
import {
  typeClient,
  roomClient,
  buildingClient,
  serviceClient,
} from '../clients'

export const MainPage: React.FC = observer(() => {
  const { palette } = useTheme()
  const { building, type, room, user, service } = useContext(Context)

  useEffect(() => {
    typeClient.loadAll(type)
    buildingClient.loadAll(building)
    roomClient.loadAll(room)
    serviceClient.loadAll(service)
  }, [])

  useEffect(
    () => roomClient.updateAll(room.page, room, building, type, user),
    [building.active, type.active, room.page]
  )

  return (
    <Grid container sx={{ backgroundColor: 'background.paper', flexGrow: 1 }}>
      <Grid
        item
        xs={3}
        sm={3}
        md={3}
        sx={{ borderRight: `2px solid ${palette.divider}` }}
      >
        <FilterBar />
      </Grid>
      <Grid
        item
        xs={9}
        sm={9}
        md={9}
        sx={{ backgroundColor: palette.background.default }}
      >
        {user.isAuth && user.user.role === roles.admin && (
          <RoomCreateForm loadRooms={() => roomClient.loadAll(room)} />
        )}
        <RoomGrid />
      </Grid>
    </Grid>
  )
})
