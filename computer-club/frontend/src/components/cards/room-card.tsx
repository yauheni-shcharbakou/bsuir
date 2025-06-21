import { join } from 'path';
import React, { FC } from 'react';
import { Button, Card, CardText, Col, NavLink, Row } from 'reactstrap';
import { RoomCardProps } from '../../abstractions/props/components';
import { Route } from '../../constants/enums';

const RoomCard: FC<RoomCardProps> = ({ room, pickHandler, deleteHandler, isAdmin }) => {
  return (
    <Card body className="m-1" color="light">
      <Row>
        <Col md={9} className="align-self-center">
          <CardText>Название: {room.name}</CardText>
          <CardText>Тип: {room.type.name}</CardText>
          <CardText>Количество мест: {room.type.places}</CardText>
          <CardText>Цена: {room.type.price} рублей/час</CardText>
        </Col>
        <Col md={3} className="text-center align-self-center">
          <NavLink href={join(isAdmin ? Route.ADMIN_ROOMS : Route.ROOMS, room.id.toString())}>
            <Button color="outline-success" className="m-1 w-100">
              {isAdmin ? 'Управлять' : 'Перейти'}
            </Button>
          </NavLink>
          {isAdmin && (
            <>
              <Button color="outline-warning" className="m-1 w-100" onClick={pickHandler}>
                Изменить
              </Button>
              <Button color="outline-danger" className="m-1 w-100" onClick={deleteHandler}>
                Удалить
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default RoomCard;
