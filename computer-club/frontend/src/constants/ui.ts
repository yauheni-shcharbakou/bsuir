import { Route, RouteTitle } from './enums';

type NavRouteParams = {
  title: RouteTitle;
  link: Route;
};

export const NAV_CLIENT_ROUTES: NavRouteParams[] = [
  {
    title: RouteTitle.ROOMS,
    link: Route.ROOMS,
  },
  {
    title: RouteTitle.BOOKINGS,
    link: Route.BOOKINGS,
  },
  {
    title: RouteTitle.OPTIONS,
    link: Route.OPTIONS,
  },
  {
    title: RouteTitle.ORDERS,
    link: Route.ORDERS,
  },
  {
    title: RouteTitle.EVENTS,
    link: Route.EVENTS,
  },
];

export const NAV_ADMIN_ROUTES: NavRouteParams[] = [
  {
    title: RouteTitle.ADMIN_COMPUTER_TYPES,
    link: Route.ADMIN_COMPUTER_TYPES,
  },
  {
    title: RouteTitle.ADMIN_ROOM_TYPES,
    link: Route.ADMIN_ROOM_TYPES,
  },
  {
    title: RouteTitle.ADMIN_OPTIONS,
    link: Route.ADMIN_OPTIONS,
  },
  {
    title: RouteTitle.ADMIN_EVENTS,
    link: Route.ADMIN_EVENTS,
  },
  {
    title: RouteTitle.ADMIN_USERS,
    link: Route.ADMIN_USERS,
  },
  {
    title: RouteTitle.ADMIN_ROOMS,
    link: Route.ADMIN_ROOMS,
  },
];
