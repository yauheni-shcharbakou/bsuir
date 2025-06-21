import { FC } from 'react';
import { ProfileItemFormProps } from '../../abstractions/props/components';
import { Button, Card, CardTitle, Col, Input, Row } from 'reactstrap';

const ProfileItemForm: FC<ProfileItemFormProps> = ({
  title,
  value,
  placeholder,
  isEdit,
  isSubmitBlocked,
  editHandler,
  inputHandler,
  submitHandler,
}) => {
  return (
    <Card body color="light my-1">
      <CardTitle tag="h6" className="text-center">
        {title}
      </CardTitle>
      <Row className="text-center">
        <Col md={3} className="text-start align-self-center">
          <Button color="primary" onClick={editHandler} className="w-75">
            {isEdit ? 'Отменить' : 'Изменить'}
          </Button>
        </Col>
        <Col md={6} className="text-center align-self-center">
          <Input
            type="text"
            placeholder={placeholder}
            value={value}
            required
            autoComplete="off"
            disabled={!isEdit}
            onInput={inputHandler}
          />
        </Col>
        <Col md={3} className="text-end align-self-center">
          <Button color="primary" disabled={isSubmitBlocked} onClick={submitHandler} className="w-75">
            ОК
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ProfileItemForm;
