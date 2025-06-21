import { FC } from 'react';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { ReviewFormProps } from '../../abstractions/props/components';

const ReviewForm: FC<ReviewFormProps> = ({ text, isSubmitBlocked, changeTextHandler, submitHandler }) => {
  return (
    <Row>
      <Col md={8}>
        <FormGroup>
          <Label for="text">Текст отзыва</Label>
          <Input
            id="text"
            type="text"
            placeholder="Введите текст отзыва"
            value={text}
            required
            autoComplete="off"
            onInput={changeTextHandler}
          />
        </FormGroup>
      </Col>
      <Col md={4} className="text-center align-self-center">
        <Button color="primary" disabled={isSubmitBlocked} onClick={submitHandler}>
          Добавить отзыв
        </Button>
      </Col>
    </Row>
  );
};

export default ReviewForm;
