import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../store'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { RoomServiceContainer } from '../components/room/RoomServiceContainer'
import { Service, Type } from '../interfaces/models'
import { TypeCard } from '../components/cards/TypeCard'
import { serviceClient, typeClient } from '../clients'

export const TypePage: React.FC = observer(() => {
  const { service, type } = useContext(Context)
  const [name, setName] = useState('')
  const [places, setPlaces] = useState(0)
  const [services, setServices] = useState<string[]>([])
  const [editedType, setEditedType] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    serviceClient.loadAll(service)
    typeClient.loadAll(type)
  }, [])

  const serviceHandler = (checked: boolean, service: Service) => {
    setServices((prev) =>
      checked ? [...prev, service._id] : prev.filter((v) => v !== service._id)
    )
  }

  const resetForm = () => {
    setName('')
    setPlaces(0)
    setServices(() => [])
  }

  const resetEdit = () => {
    setEditedType('')
    setIsEdit(false)
    resetForm()
  }

  const submitCreateHandler = () =>
    typeClient.create(places, name, services, type, resetForm)

  const submitChangeHandler = () =>
    typeClient.change(editedType, places, name, services, type, resetEdit)

  const changeHandler = (t: Type) => {
    setName(t.name)
    setServices(t._services)
    setPlaces(t.places)
    setEditedType(t._id)
    setIsEdit(true)
  }

  return (
    <Container sx={{ p: 2, mx: 'auto', width: 500 }}>
      <Typography component="h4" variant="h4" align="center">
        Types
      </Typography>
      <Box
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <TextField
          label="Type name"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Places"
          value={places}
          type="number"
          onChange={(e) => setPlaces(parseInt(e.target.value as string, 10))}
        />
      </Box>
      <Box
        sx={{
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <RoomServiceContainer
          services={service.services}
          checked={services}
          onChange={serviceHandler}
        />
        <Button
          variant="contained"
          onClick={isEdit ? submitChangeHandler : submitCreateHandler}
        >
          {isEdit ? 'Edit type' : 'Add type'}
        </Button>
      </Box>
      <Box sx={{ py: 1 }}>
        {type.types.length ? (
          type.types.map((currentType) => (
            <TypeCard
              key={currentType._id}
              type={currentType}
              onChange={changeHandler}
              onDelete={(id: string) => typeClient.delete(id, type)}
            />
          ))
        ) : (
          <Box sx={{ textAlign: 'center' }}>No types</Box>
        )}
      </Box>
    </Container>
  )
})
