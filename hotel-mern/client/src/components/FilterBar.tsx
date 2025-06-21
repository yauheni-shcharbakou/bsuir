import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import { Context } from '../store'
import { Divider, useTheme } from '@mui/material'
import { observer } from 'mobx-react-lite'

export const FilterBar: React.FC = observer(() => {
  const { building, type } = useContext(Context)
  const { palette } = useTheme()

  const buildingHandler = (id: string) => {
    building.setActive(id !== building.active ? id : '')
  }

  const typeHandler = (id: string) => {
    type.setActive(id !== type.active ? id : '')
  }

  return (
    <Box
      component="div"
      sx={{
        bgcolor: 'background.paper',
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          overflow: 'auto',
          maxHeight: '50vh',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Buildings
          </ListSubheader>
        }
      >
        {building.buildings.map(({ _id, address }) => (
          <ListItem disablePadding key={_id}>
            <ListItemButton
              selected={_id === building.active}
              onClick={() => buildingHandler(_id)}
            >
              <ListItemText primary={address} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider color={palette.divider} variant="fullWidth" />
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Types
          </ListSubheader>
        }
      >
        {type.types.map(({ _id, name }) => (
          <ListItem disablePadding key={_id}>
            <ListItemButton
              selected={_id === type.active}
              onClick={() => typeHandler(_id)}
            >
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider color={palette.divider} variant="fullWidth" />
    </Box>
  )
})
