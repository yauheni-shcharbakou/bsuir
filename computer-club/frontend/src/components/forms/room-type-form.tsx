import { FC } from 'react';
import { Button, Card, CardText, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { RoomTypeFormProps } from '../../abstractions/props/components';
import { RouteTitle } from '../../constants/enums';

const RoomTypeForm: FC<RoomTypeFormProps> = ({
  name,
  places,
  price,
  isEdit,
  isSubmitBlocked,
  changeNameHandler,
  changePlacesHandler,
  changePriceHandler,
  submitHandler,
}) => {
  return (
    <Card body color="light">
      <CardText tag="h4" className="text-center">
        {RouteTitle.ADMIN_ROOM_TYPES}
      </CardText>
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Название</Label>
              <Input
                id="name"
                type="text"
                placeholder="Введите название"
                value={name}
                required
                autoComplete="off"
                onInput={changeNameHandler}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="places">Количество мест</Label>
              <Input
                id="places"
                type="number"
                value={places}
                required
                min={0}
                autoComplete="off"
                onInput={changePlacesHandler}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col md={6}>
            <FormGroup>
              <Label for="price">Цена (рублей/час)</Label>
              <Input
                id="price"
                type="number"
                value={price}
                min={0}
                required
                autoComplete="off"
                onInput={changePriceHandler}
              />
            </FormGroup>
          </Col>
          <Col md={6} className="text-center">
            <Button color="primary" disabled={isSubmitBlocked} onClick={submitHandler}>
              {isEdit ? 'Изменить' : 'Создать'} тип помещения
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default RoomTypeForm;
