import React, { FC } from 'react';
import { Button, Card, CardText, Col, Row } from 'reactstrap';
import { ComputerTypeCardProps } from '../../abstractions/props/components';

const ComputerTypeCard: FC<ComputerTypeCardProps> = ({ computerType, pickHandler, deleteHandler }) => {
  return (
    <Card body className="m-1" color="light">
      <Row>
        <Col md={9} className="align-self-center">
          <CardText>Название: {computerType.name}</CardText>
          <CardText>Оперативная память: {computerType.ram}</CardText>
          <CardText>Процессор: {computerType.cpu}</CardText>
          <CardText>Видеокарта: {computerType.gpu}</CardText>
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

export default ComputerTypeCard;
