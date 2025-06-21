import React, { useContext } from 'react'
import { Button, Container, Grid } from '@mui/material'
import { AppSelect } from '../app/AppSelect'
import { RoomBookContainerProps } from '../../interfaces/props'
import { Context } from '../../store'

export const RoomBookContainer: React.FC<RoomBookContainerProps> = ({
  selectOptions,
  selectValues,
  selectValue,
  selectHandler,
  bookHandler,
}) => {
  const { user, room } = useContext(Context)

  return (
    <Grid item md={6}>
      <Container sx={{ textAlign: 'center' }}>
        <AppSelect
          changeHandler={selectHandler}
          label="places"
          options={selectOptions}
          values={selectValues}
          value={selectValue}
        />
        <Button
          variant="contained"
          sx={{ m: '0 auto' }}
          onClick={bookHandler}
          disabled={!user.isAuth || !room.current.isFree}
        >
          Book this room
        </Button>
      </Container>
    </Grid>
  )
}
