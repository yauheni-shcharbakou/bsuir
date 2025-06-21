import React, { FC } from 'react';
import { Badge, Card, CardText, Col, Row } from 'reactstrap';
import { OrderCardProps } from '../../abstractions/props/components';
import moment from 'moment';

const OrderCard: FC<OrderCardProps> = ({ order }) => {
  return (
    <Card body className="m-1" color="light">
      <Row>
        <Col sm={9} className="align-self-center">
          <CardText>{moment(order.createdAt).format('D MMMM YYYY, H:mm')}</CardText>
          <CardText>
            {order.option.name}, {order.amount} шт.
          </CardText>
        </Col>
        <Col sm={3} className="text-center align-self-center">
          <Badge pill className="fs-4" color="success">
            {order.option.price * order.amount} руб.
          </Badge>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderCard;
