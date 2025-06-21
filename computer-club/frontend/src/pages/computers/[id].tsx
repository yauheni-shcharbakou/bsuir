import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { ComputerRepository } from '../../repositories';
import { ParsedUrlQuery } from 'querystring';
import Layout from '../../components/layout';
import AppBar from '../../components/app-bar/app-bar';
import { useAuthService, useBookingService } from '../../services';
import { ComputerPageProps } from '../../abstractions/props/pages';
import { Button, Card, CardText, CardTitle, CloseButton, Table } from 'reactstrap';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const computerRepository = new ComputerRepository();
  const { id } = context.params as ParsedUrlQuery & { id: string };

  const [computer, initBookings] = await Promise.all([
    computerRepository.getById(+id),
    computerRepository.getComputerBookings(+id),
  ]);

  return { props: { computer, initBookings } };
};

const ComputerPage: NextPage<ComputerPageProps> = ({ computer, initBookings }) => {
  const { isAuth, isAdmin, userId, logoutHandler } = useAuthService();
  const { bookingTable, tableRowsData, bookHandler, deleteHandler } = useBookingService(initBookings, isAdmin, userId);

  return (
    <Layout title={`Компьютер ${computer.code}`}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <Card body color="light" className="my-1">
          <CardTitle tag="h4" className="pb-2">
            Компьютер {computer.code}
          </CardTitle>
          <CardText>
            {computer.type.name} ({computer.type.cpu}, {computer.type.ram}, {computer.type.gpu})
          </CardText>
          <CardText>Помещение {computer.room.name}</CardText>
        </Card>
        <Card body color="light" className="my-1">
          <CardText tag="h4">Бронирование</CardText>
          <Table bordered hover responsive>
            <tbody>
              <tr>
                <th></th>
                {Object.keys(bookingTable).map((day: string) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
              {tableRowsData.map(({ hour, cells }) => (
                <tr key={hour}>
                  <th>{hour} ч.</th>
                  {cells.map(({ key, className, isDeleteAllowed, booking, date }) => (
                    <td key={key} className={className}>
                      {booking && isDeleteAllowed && (
                        <CloseButton className="text-center" onClick={deleteHandler(booking.id)} />
                      )}
                      {!booking && (
                        <Button color="primary" size="sm" onClick={bookHandler(computer.id, date)}>
                          +
                        </Button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </Layout>
  );
};

export default ComputerPage;
