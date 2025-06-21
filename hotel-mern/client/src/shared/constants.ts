import { paths } from './enums'
import { ErrorResponse } from '../interfaces/responses'

export const pageButtonTitles = ['Buildings', 'Services', 'Types']
export const pageButtonPaths = [paths.building, paths.service, paths.type]
export const incorrectHandler = () => alert('Incorrect data')

export const errorViewer = (e: unknown) => {
  if ((e as ErrorResponse).response?.data?.message) {
    alert((e as ErrorResponse).response?.data?.message || 'Error')
  }
}
