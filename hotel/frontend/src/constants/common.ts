import { ButtonParams } from '../abstractions/types';
import { EndPoint } from './enums';

export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export const ADMIN_BUTTONS: ButtonParams[] = [
  {
    title: 'Buildings',
    path: EndPoint.ADMIN_BUILDINGS,
  },
  {
    title: 'Options',
    path: EndPoint.ADMIN_OPTIONS,
  },
  {
    title: 'Rooms',
    path: EndPoint.ADMIN_ROOMS,
  },
  {
    title: 'Types',
    path: EndPoint.ADMIN_TYPES,
  },
  {
    title: 'Users',
    path: EndPoint.ADMIN_USERS,
  },
];
