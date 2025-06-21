import { FC } from 'react';
import { Button, Card, CardText, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { OptionFormProps } from '../../abstractions/props/components';
import { RouteTitle } from '../../constants/enums';

const OptionForm: FC<OptionFormProps> = ({
  name,
  description,
  price,
  isEdit,
  isSubmitBlocked,
  changeNameHandler,
  changeDescriptionHandler,
  changePriceHandler,
  submitHandler,
}) => {
  return (
    <Card body color="light">
      <CardText tag="h4" className="text-center">
        {RouteTitle.ADMIN_OPTIONS}
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
              <Label for="description">Описание</Label>
              <Input
                id="description"
                type="text"
                placeholder="Введите описание"
                value={description}
                required
                autoComplete="off"
                onInput={changeDescriptionHandler}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col md={6}>
            <FormGroup>
              <Label for="price">Цена (рублей)</Label>
              <Input
                id="price"
                type="number"
                value={price}
                required
                autoComplete="off"
                min={0}
                onInput={changePriceHandler}
              />
            </FormGroup>
          </Col>
          <Col md={6} className="text-center px-5">
            <Button color="primary" disabled={isSubmitBlocked} onClick={submitHandler}>
              {isEdit ? 'Изменить' : 'Создать'} услугу
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default OptionForm;
