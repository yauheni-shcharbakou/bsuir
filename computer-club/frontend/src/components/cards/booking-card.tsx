import React, { FC } from 'react';
import { Card, CardText, CloseButton, Col, Row } from 'reactstrap';
import { BookingCardProps } from '../../abstractions/props/components';
import moment from 'moment';

const BookingCard: FC<BookingCardProps> = ({ booking, deleteHandler }) => {
  return (
    <Card body className="m-1" color="light">
      <Row>
        <Col sm={10} className="align-self-center">
          <CardText>{moment(booking.date).format('D MMMM YYYY, H:mm')}</CardText>
          <CardText>
            Компьютер {booking.computer.code}, {booking.hours} час.
          </CardText>
        </Col>
        <Col sm={2} className="text-center align-self-center">
          <CloseButton className="fs-4" color="success" onClick={deleteHandler} />
        </Col>
      </Row>
    </Card>
  );
};

export default BookingCard;
