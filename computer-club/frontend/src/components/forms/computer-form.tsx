import { FC } from 'react';
import { Button, Card, CardText, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { ComputerFormProps } from '../../abstractions/props/components';
import { ComputerType } from '../../abstractions/models';

const ComputerForm: FC<ComputerFormProps> = ({
  roomName,
  code,
  type,
  types,
  isEdit,
  isSubmitBlocked,
  changeCodeHandler,
  changeTypeHandler,
  submitHandler,
}) => {
  return (
    <Card body color="light">
      <CardText tag="h4" className="text-center">
        Управление компьютерами помещения {roomName}
      </CardText>
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="code">Код компьютера</Label>
              <Input
                id="code"
                type="text"
                placeholder="Введите код компьютера"
                value={code}
                required
                autoComplete="off"
                onInput={changeCodeHandler}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="computer-type">Тип компьютера</Label>
              <Input
                id="computer-type"
                name="computer-type"
                type="select"
                value={type}
                required
                autoComplete="off"
                onInput={changeTypeHandler}
              >
                <option value={0}>Выбрать тип компьютера</option>
                {types.map((computerType: ComputerType) => (
                  <option key={computerType.id.toString()} value={computerType.id}>
                    {computerType.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Button color="primary" disabled={isSubmitBlocked} onClick={submitHandler}>
            {isEdit ? 'Изменить' : 'Создать'} компьютер
          </Button>
        </Row>
      </Form>
    </Card>
  );
};

export default ComputerForm;
