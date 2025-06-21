import { FC } from 'react';
import { ReviewCardProps } from '../../../abstractions/props/components';
import { Badge, Button, Card, Col, Input, Row } from 'reactstrap';
import { useReviewCardService } from './use-review-card.service';

const ReviewCard: FC<ReviewCardProps> = ({ review, isAdmin, userId, updateHandler, deleteHandler }) => {
  const { text, isEdit, isSubmitBlocked, editHandler, changeTextHandler, submitHandler } = useReviewCardService(
    review,
    updateHandler,
  );

  return (
    <Card body color="light my-1">
      <Row>
        <Col sm={6}>
          <Badge className="mb-2" color={isAdmin ? 'primary' : 'secondary'}>
            {review.user.email}
          </Badge>
          <Input
            type="text"
            placeholder="Введите текст отзыва"
            value={text}
            required
            autoComplete="off"
            disabled={!isEdit}
            onInput={changeTextHandler}
          />
        </Col>
        {(isAdmin || userId === review.user.id) && (
          <>
            <Col sm={2} className="text-center align-self-center my-1">
              <Button size="sm" color="primary" onClick={editHandler} className="w-100">
                {isEdit ? 'Отменить' : 'Изменить'}
              </Button>
            </Col>
            <Col sm={2} className="text-center align-self-center my-1">
              <Button size="sm" color="primary" disabled={isSubmitBlocked} onClick={submitHandler} className="w-100">
                ОК
              </Button>
            </Col>
            <Col sm={2} className="text-center align-self-center my-1">
              <Button size="sm" color="primary" disabled={isEdit} onClick={deleteHandler} className="w-100">
                Удалить
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Card>
  );
};

export default ReviewCard;
