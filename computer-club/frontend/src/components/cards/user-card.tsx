import React, { FC } from 'react';
import { Button, Card, CardText, Col, Row } from 'reactstrap';
import { UserCardProps } from '../../abstractions/props/components';
import { UserRole } from '../../constants/enums';

const UserCard: FC<UserCardProps> = ({ user, updateRoleHandler, deleteHandler }) => {
  return (
    <Card body className="m-1 bg-opacity-25" color={user.role === UserRole.ADMIN ? 'primary' : 'light'}>
      <Row>
        <CardText>
          E-mail: <a href={`mailto:${user.email}`}>{user.email}</a>
        </CardText>
        <CardText>Телефон: {user.phone}</CardText>
        <CardText>Никнейм: {user.nickname}</CardText>
        <CardText>Роль: {user.role === UserRole.ADMIN ? 'администратор' : 'клиент'}</CardText>
      </Row>
      <Row className="pt-2">
        <Col md={6} className="text-center align-self-center">
          <Button color="warning" className="m-1 w-100" onClick={updateRoleHandler}>
            {user.role === UserRole.CLIENT ? 'Сделать администратором' : 'Сделать клиентом'}
          </Button>
        </Col>
        <Col md={6} className="text-center align-self-center">
          <Button color="danger" className="m-1 w-100" onClick={deleteHandler}>
            Удалить
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default UserCard;
