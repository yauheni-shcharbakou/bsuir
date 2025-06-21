import { FC } from 'react';
import { Button, Card, CardText, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { RoomFormProps } from '../../abstractions/props/components';
import { RouteTitle } from '../../constants/enums';
import { RoomType } from '../../abstractions/models';

const RoomTypeForm: FC<RoomFormProps> = ({
  name,
  type,
  types,
  isEdit,
  isSubmitBlocked,
  changeNameHandler,
  changeTypeHandler,
  submitHandler,
}) => {
  return (
    <Card body color="light">
      <CardText tag="h4" className="text-center">
        {RouteTitle.ADMIN_ROOMS}
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
              <Label for="room-type">Тип помещения</Label>
              <Input
                id="room-type"
                name="room-type"
                type="select"
                value={type}
                required
                autoComplete="off"
                onInput={changeTypeHandler}
              >
                <option value={0}>Выбрать тип помещения</option>
                {types.map((roomType: RoomType) => (
                  <option key={roomType.id.toString()} value={roomType.id}>
                    {roomType.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Button color="primary" disabled={isSubmitBlocked} onClick={submitHandler}>
            {isEdit ? 'Изменить' : 'Создать'} помещение
          </Button>
        </Row>
      </Form>
    </Card>
  );
};

export default RoomTypeForm;
