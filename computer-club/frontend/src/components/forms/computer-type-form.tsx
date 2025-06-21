import { FC } from 'react';
import { Button, Card, CardText, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { ComputerTypeFormProps } from '../../abstractions/props/components';
import { RouteTitle } from '../../constants/enums';

const ComputerTypeForm: FC<ComputerTypeFormProps> = ({
  name,
  cpu,
  gpu,
  ram,
  isEdit,
  isSubmitBlocked,
  changeNameHandler,
  changeRamHandler,
  changeCpuHandler,
  changeGpuHandler,
  submitHandler,
}) => {
  return (
    <Card body color="light">
      <CardText tag="h4" className="text-center">
        {RouteTitle.ADMIN_COMPUTER_TYPES}
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
              <Label for="ram">Оперативная память</Label>
              <Input
                id="ram"
                type="text"
                placeholder="Информация об ОЗУ"
                value={ram}
                required
                autoComplete="off"
                onInput={changeRamHandler}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="cpu">Процессор</Label>
              <Input
                id="cpu"
                type="text"
                placeholder="Информация о процессоре"
                value={cpu}
                required
                autoComplete="off"
                onInput={changeCpuHandler}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="gpu">Видеокарта</Label>
              <Input
                id="gpu"
                type="text"
                placeholder="Информация о видеокарте"
                value={gpu}
                required
                autoComplete="off"
                onInput={changeGpuHandler}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="px-5">
          <Button color="primary" disabled={isSubmitBlocked} onClick={submitHandler}>
            {isEdit ? 'Изменить' : 'Создать'} тип компьютера
          </Button>
        </Row>
      </Form>
    </Card>
  );
};

export default ComputerTypeForm;
