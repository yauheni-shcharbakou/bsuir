import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../store'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { ServiceCard } from '../components/cards/ServiceCard'
import { Service } from '../interfaces/models'
import { serviceClient } from '../clients'

export const ServicePage: React.FC = observer(() => {
  const { service } = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [editedService, setEditedService] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => serviceClient.loadAll(service), [])

  const resetForm = () => {
    setName('')
    setPrice(0)
  }

  const resetEdit = () => {
    setEditedService('')
    setIsEdit(false)
    resetForm()
  }

  const submitCreateHandler = () =>
    serviceClient.create(name, price, service, resetForm)

  const submitChangeHandler = () =>
    serviceClient.change(editedService, name, price, service, resetEdit)

  const changeHandler = (s: Service) => {
    setName(s.name)
    setPrice(s.price)
    setEditedService(s._id)
    setIsEdit(true)
  }

  return (
    <Container sx={{ p: 2, mx: 'auto', width: 500 }}>
      <Typography component="h4" variant="h4" align="center">
        Services
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
          label="Service name"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Service price"
          value={price}
          type="number"
          onChange={(e) => setPrice(parseInt(e.target.value as string, 10))}
        />
      </Box>
      <Box sx={{ py: 1, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={isEdit ? submitChangeHandler : submitCreateHandler}
        >
          {isEdit ? 'Edit service' : 'Add service'}
        </Button>
      </Box>
      <Box sx={{ py: 1 }}>
        {service.services.length ? (
          service.services.map((currentService) => (
            <ServiceCard
              key={currentService._id}
              service={currentService}
              onChange={changeHandler}
              onDelete={(id: string) => serviceClient.delete(id, service)}
            />
          ))
        ) : (
          <Box sx={{ textAlign: 'center' }}>No services</Box>
        )}
      </Box>
    </Container>
  )
})
