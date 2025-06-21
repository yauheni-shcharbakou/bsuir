import React, { useContext, useState } from 'react'
import { Box, Button } from '@mui/material'
import { Context } from '../../store'
import { AppSelect } from '../app/AppSelect'
import { observer } from 'mobx-react-lite'
import { RoomCreateFormProps } from '../../interfaces/props'
import { roomClient } from '../../clients'

export const RoomCreateForm: React.FC<RoomCreateFormProps> = observer(
  ({ loadRooms }) => {
    const { room, type, building } = useContext(Context)
    const [checkedBuilding, setCheckedBuilding] = useState('')
    const [checkedType, setCheckedType] = useState('')

    const typeOptions = ['none', ...type.types.map(({ name }) => name)]
    const typeValues = ['', ...type.types.map(({ _id }) => _id)]
    const buildingOptions = [
      'none',
      ...building.buildings.map(({ address }) => address),
    ]
    const buildingValues = ['', ...building.buildings.map(({ _id }) => _id)]

    const createHandler = () =>
      roomClient.create(checkedBuilding, checkedType, loadRooms)

    const changeHandler = () =>
      roomClient.change(checkedBuilding, checkedType, room)

    return (
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          px: 1,
          width: '100%',
          display: 'flex',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <AppSelect
          label="Type"
          options={typeOptions}
          values={typeValues}
          value={checkedType}
          changeHandler={(type: string) => setCheckedType(type)}
        />
        <AppSelect
          label="Building"
          options={buildingOptions}
          values={buildingValues}
          value={checkedBuilding}
          changeHandler={(b: string) => setCheckedBuilding(b)}
        />
        <Button
          variant="contained"
          onClick={room.isEdit ? changeHandler : createHandler}
        >
          {room.isEdit ? 'Edit room' : 'Add room'}
        </Button>
      </Box>
    )
  }
)
