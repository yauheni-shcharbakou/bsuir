import React, { FC } from 'react';
import { Button, Card, CardText, Col, Row } from 'reactstrap';
import { EventCardProps } from '../../abstractions/props/components';
import moment from 'moment';

const EventCard: FC<EventCardProps> = ({ isAdmin, event, pickHandler, readHandler, deleteHandler }) => {
  return (
    <Card
      body
      className={event.isNew ? 'm-1 border-success bg-opacity-25' : 'm-1 bg-opacity-25'}
      color={event.isNew ? 'success' : 'light'}
    >
      <Row>
        <Col md={9} className="align-self-center">
          <CardText>{event.name}</CardText>
          <CardText>{moment(event.date).format('D MMMM YYYY, H:mm')}</CardText>
        </Col>
        <Col md={3} className="text-center align-self-center">
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
          {!isAdmin && event.isNew && (
            <Button color="outline-primary" className="m-1 w-100" onClick={readHandler}>
              Прочитать
            </Button>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default EventCard;
