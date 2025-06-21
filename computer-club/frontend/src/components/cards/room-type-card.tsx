import React, { FC } from 'react';
import { Button, Card, CardText, Col, Row } from 'reactstrap';
import { RoomTypeCardProps } from '../../abstractions/props/components';

const RoomTypeCard: FC<RoomTypeCardProps> = ({ roomType, pickHandler, deleteHandler }) => {
  return (
    <Card body className="m-1" color="light">
      <Row>
        <Col md={9} className="align-self-center">
          <CardText>Название: {roomType.name}</CardText>
          <CardText>Количество мест: {roomType.places}</CardText>
          <CardText>Цена: {roomType.price} рублей/час</CardText>
        </Col>
        <Col md={3} className="text-center align-self-center">
          <Button color="outline-warning" className="m-1 w-100" onClick={pickHandler}>
            Изменить
          </Button>
          <Button color="outline-danger" className="m-1 w-100" onClick={deleteHandler}>
            Удалить
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default RoomTypeCard;
