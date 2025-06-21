import { join } from 'path';
import React, { FC } from 'react';
import { Button, Card, CardText, Col, NavLink, Row } from 'reactstrap';
import { ComputerCardProps } from '../../abstractions/props/components';
import { Route } from '../../constants/enums';

const ComputerCard: FC<ComputerCardProps> = ({ computer, pickHandler, deleteHandler, isAdmin }) => {
  return (
    <Card body className="m-1" color="light">
      <Row>
        <Col md={9} className="align-self-center">
          <CardText>Код {computer.code}</CardText>
          <CardText>
            {computer.type.name} ({computer.type.cpu}, {computer.type.ram}, {computer.type.gpu})
          </CardText>
        </Col>
        <Col md={3} className="text-center align-self-center">
          {isAdmin ? (
            <>
              <Button color="outline-warning" className="m-1 w-100" onClick={pickHandler}>
                Изменить
              </Button>
              <Button color="outline-danger" className="m-1 w-100" onClick={deleteHandler}>
                Удалить
              </Button>
            </>
          ) : (
            <NavLink href={join(Route.COMPUTERS, computer.id.toString())}>
              <Button color="outline-success" className="m-1 w-100">
                Открыть
              </Button>
            </NavLink>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default ComputerCard;
