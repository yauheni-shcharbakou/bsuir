import React, { useState } from 'react'
import { DatePickerProps } from '../interfaces/props'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import { TextField } from '@mui/material'

export const DatePicker: React.FC<DatePickerProps> = ({ onChange }) => {
  const [value, setValue] = useState(new Date())
  const handleChange = (value: Date | null) => {
    setValue(value || new Date())
    onChange(value || new Date())
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DesktopDatePicker
        label="Put date"
        inputFormat="dd/MM/yyyy"
        value={value}
        maxDate={new Date()}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
