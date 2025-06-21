import { useRouter } from 'next/router';
import { useState } from 'react';
import { Route } from '../../constants/enums';
import { ADMIN_ROUTES } from '../../constants/common';

export function useAppBarService() {
  const { pathname } = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const isActiveRoute = (route: Route): boolean => {
    switch (true) {
      case ADMIN_ROUTES.includes(pathname) && route === Route.ADMIN:
      case pathname.includes(`${Route.ADMIN_ROOMS}/`) && route === Route.ADMIN:
      case pathname.includes(`${Route.COMPUTERS}/`) && route === Route.ROOMS:
      case pathname.includes(`${Route.ROOMS}/`) && route === Route.ROOMS:
        return true;
      default:
        return route === pathname;
    }
  };

  const toggleIsOpen = () => setIsOpen(() => !isOpen);

  return {
    isOpen,
    isActiveRoute,
    toggleIsOpen,
  };
}
