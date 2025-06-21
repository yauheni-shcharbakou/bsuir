import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Context } from '../../store'
import { RoomCard } from '../cards/RoomCard'
import { useHistory } from 'react-router-dom'
import { paths } from '../../shared/enums'
import { observer } from 'mobx-react-lite'
import { RoomPopulated } from '../../interfaces/populatedModels'
import { Pagination } from '@mui/material'
import { roomClient } from '../../clients'

export const RoomGrid: React.FC = observer(() => {
  const { room, user } = useContext(Context)
  const { push } = useHistory()
  const isAdmin = user.isAuth ? user.user.role === 'admin' : false

  const cardHandler = (currentRoom: RoomPopulated) => {
    room.setCurrent(currentRoom)
    push(`${paths.room}/${currentRoom._id}`)
  }

  const paginationHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    room.setPage(value)
  }

  const changeHandler = (id: string) => {
    room.setEditedRoom(id)
    room.toggleIsEdit()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Pagination
        count={room.pageAmount}
        page={room.page}
        variant="outlined"
        color="primary"
        sx={{ p: 1 }}
        onChange={paginationHandler}
      />
      <Grid container spacing={2} columns={12} sx={{ p: 2 }}>
        {room.rooms.map((currentRoom) => (
          <RoomCard
            key={currentRoom._id}
            room={currentRoom}
            clickHandler={cardHandler}
            onChange={changeHandler}
            onDelete={(id: string) => roomClient.delete(id, room)}
            isAdmin={isAdmin}
          />
        ))}
      </Grid>
    </Box>
  )
})
