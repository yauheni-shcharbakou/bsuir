import type { NextPage } from 'next';
import Layout from '../../components/layout';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardSubtitle,
  CardTitle,
  Col,
} from 'reactstrap';
import { useAccordionService, useAuthService, useComputerService, useReviewService } from '../../services';
import AppBar from '../../components/app-bar/app-bar';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { RoomRepository } from '../../repositories';
import { RoomPageProps } from '../../abstractions/props/pages';
import { ComputerPopulated, ReviewPopulated } from '../../abstractions/models';
import { ParsedUrlQuery } from 'querystring';
import ComputerCard from '../../components/cards/computer-card';
import { RoomPageAccordionItem } from '../../constants/enums';
import ReviewCard from '../../components/cards/review-card/review-card';
import ReviewForm from '../../components/forms/review-form';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const roomRepository = new RoomRepository();
  const { id } = context.params as ParsedUrlQuery & { id: string };

  const [room, initComputers, initReviews] = await Promise.all([
    roomRepository.getById(+id),
    roomRepository.getRoomComputers(+id),
    roomRepository.getRoomReviews(+id),
  ]);

  return { props: { room, initComputers, initReviews } };
};

const RoomPage: NextPage<RoomPageProps> = ({ room, initComputers, initReviews }) => {
  const { isAuth, isAdmin, userId, logoutHandler } = useAuthService();
  const { computers } = useComputerService(room.id, initComputers);
  const { reviews, isSubmitBlocked, text, changeTextHandler, createHandler, deleteHandler, updateHandler } =
    useReviewService(room.id, initReviews);
  const { opened, toggle } = useAccordionService(RoomPageAccordionItem.COMPUTERS);

  return (
    <Layout title={`Помещение ${room.name}`}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <Card body className="my-1">
          <CardTitle tag="h4">Помещение {room.name}</CardTitle>
          <CardSubtitle>
            {room.type.name}, количество мест - {room.type.places}, {room.type.price} руб./час
          </CardSubtitle>
        </Card>
        <Col>
          {/* @ts-ignore */}
          <Accordion open={opened} toggle={toggle}>
            <AccordionItem>
              <AccordionHeader targetId={RoomPageAccordionItem.COMPUTERS}>Компьютеры</AccordionHeader>
              <AccordionBody accordionId={RoomPageAccordionItem.COMPUTERS}>
                {computers.map((computer: ComputerPopulated) => (
                  <ComputerCard key={computer.id.toString()} computer={computer} />
                ))}
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId={RoomPageAccordionItem.REVIEWS}>Отзывы</AccordionHeader>
              <AccordionBody accordionId={RoomPageAccordionItem.REVIEWS}>
                <ReviewForm
                  isSubmitBlocked={isSubmitBlocked}
                  submitHandler={createHandler}
                  text={text}
                  changeTextHandler={changeTextHandler}
                />
                {reviews.map((review: ReviewPopulated) => (
                  <ReviewCard
                    key={review.id.toString()}
                    review={review}
                    isAdmin={isAdmin}
                    userId={userId}
                    updateHandler={updateHandler}
                    deleteHandler={deleteHandler(review.id)}
                  />
                ))}
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </Col>
      </div>
    </Layout>
  );
};

export default RoomPage;
