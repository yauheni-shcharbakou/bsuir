import React, { FC } from 'react';
import { Button, Card, CardText, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { OptionCardProps } from '../../../abstractions/props/components';
import { useOptionCardService } from './use-option-card.service';

const OptionCard: FC<OptionCardProps> = ({ option, pickHandler, deleteHandler, isAdmin }) => {
  const { amount, price, isSubmitBlocked, changeAmountHandler, submitHandler } = useOptionCardService(option);

  return (
    <Card body className="m-1" color="light">
      <Row>
        <Col md={9} className="align-self-center">
          <CardText>Название: {option.name}</CardText>
          <CardText>Описание: {option.description}</CardText>
          <CardText>Цена: {option.price} рублей</CardText>
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
            <>
              <FormGroup>
                <Label for="amount">Количество</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  required
                  autoComplete="off"
                  min={0}
                  onInput={changeAmountHandler}
                />
              </FormGroup>
              <Button color="success" className="m-1 w-100" disabled={isSubmitBlocked} onClick={submitHandler}>
                Купить ({price} руб.)
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default OptionCard;
