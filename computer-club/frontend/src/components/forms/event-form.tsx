import { FC } from 'react';
import { Button, Card, CardText, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { EventFormProps } from '../../abstractions/props/components';
import { RouteTitle } from '../../constants/enums';

const EventForm: FC<EventFormProps> = ({
  name,
  isEdit,
  isSubmitBlocked,
  changeNameHandler,
  changeDateHandler,
  submitHandler,
}) => {
  return (
    <Card body color="light">
      <CardText tag="h4" className="text-center">
        {RouteTitle.ADMIN_EVENTS}
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
              <Label for="date">Дата</Label>
              <Input id="date" type="datetime-local" required autoComplete="off" onInput={changeDateHandler} />
            </FormGroup>
          </Col>
        </Row>
        <Row className="text-center px-5">
          <Button color="primary" disabled={isSubmitBlocked} onClick={submitHandler}>
            {isEdit ? 'Изменить' : 'Создать'} мероприятие
          </Button>
        </Row>
      </Form>
    </Card>
  );
};

export default EventForm;
