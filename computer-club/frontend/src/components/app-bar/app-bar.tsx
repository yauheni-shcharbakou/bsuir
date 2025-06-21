import { FC } from 'react';
import { NAV_CLIENT_ROUTES } from '../../constants/ui';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { Route, RouteTitle } from '../../constants/enums';
import { useAppBarService } from './use-app-bar.service';
import { AppBarProps } from '../../abstractions/props/components';

const AppBar: FC<AppBarProps> = ({ isAuth, isAdmin, logoutHandler }) => {
  const { isOpen, isActiveRoute, toggleIsOpen } = useAppBarService();

  return (
    <div>
      <Navbar color="dark" sticky="true" dark>
        <NavbarBrand href="/">Компьютерный клуб</NavbarBrand>
        <NavbarToggler onClick={toggleIsOpen} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {isAuth &&
              NAV_CLIENT_ROUTES.map(({ title, link }) => (
                <NavItem key={link}>
                  <NavLink active={isActiveRoute(link)} href={link}>
                    {title}
                  </NavLink>
                </NavItem>
              ))}
            {isAuth && isAdmin && (
              <NavItem>
                <NavLink active={isActiveRoute(Route.ADMIN)} href={Route.ADMIN}>
                  {RouteTitle.ADMIN}
                </NavLink>
              </NavItem>
            )}
          </Nav>
          <Nav horizontal="center">
            {!isAuth && (
              <>
                <NavLink href={Route.LOGIN}>
                  <Button>{RouteTitle.LOGIN}</Button>
                </NavLink>
                <NavLink href={Route.REGISTER}>
                  <Button color="primary">{RouteTitle.REGISTER}</Button>
                </NavLink>
              </>
            )}
            {isAuth && <Button onClick={logoutHandler}>Выйти</Button>}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppBar;
