import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { Context } from '../store'
import { BuildingCard } from '../components/cards/BuildingCard'
import { observer } from 'mobx-react-lite'
import { Building } from '../interfaces/models'
import { buildingClient } from '../clients'

export const BuildingPage: React.FC = observer(() => {
  const { building } = useContext(Context)
  const [address, setAddress] = useState('')
  const [editedBuilding, setEditedBuilding] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => buildingClient.loadAll(building), [])

  const submitCreateHandler = () =>
    buildingClient.create(address, building, () => setAddress(''))

  const submitChangeHandler = () =>
    buildingClient.change(editedBuilding, address, building, () => {
      setEditedBuilding('')
      setIsEdit(false)
      setAddress('')
    })

  const changeHandler = (b: Building) => {
    setAddress(b.address)
    setEditedBuilding(b._id)
    setIsEdit(true)
  }

  return (
    <Container sx={{ p: 2, mx: 'auto', width: 500 }}>
      <Typography component="h4" variant="h4" align="center">
        Buildings
      </Typography>
      <Box
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextField
          label="address"
          value={address}
          type="text"
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={isEdit ? submitChangeHandler : submitCreateHandler}
        >
          {isEdit ? 'Edit building' : 'Add building'}
        </Button>
      </Box>
      <Box sx={{ py: 1 }}>
        {building.buildings.length ? (
          building.buildings.map((currentBuilding) => (
            <BuildingCard
              key={currentBuilding._id}
              building={currentBuilding}
              onChange={changeHandler}
              onDelete={(id: string) => buildingClient.delete(id, building)}
            />
          ))
        ) : (
          <Box sx={{ textAlign: 'center' }}>No buildings</Box>
        )}
      </Box>
    </Container>
  )
})
