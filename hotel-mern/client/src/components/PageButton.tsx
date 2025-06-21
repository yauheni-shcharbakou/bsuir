import React from 'react'
import { PageButtonProps } from '../interfaces/props'
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button'

export const PageButton: React.FC<PageButtonProps> = ({ title, path }) => {
  const { push } = useHistory()

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ m: 1 }}
      onClick={() => push(path)}
    >
      {title}
    </Button>
  )
}
