import { FC } from 'react';
import { Card, CardText, Table } from 'reactstrap';
import { ProfileInfoCardProps } from '../../abstractions/props/components';

const ProfileInfoCard: FC<ProfileInfoCardProps> = ({ user, isAdmin }) => {
  return (
    <Card body color="light">
      <CardText tag="h4" className="text-center">
        Информация об аккаунте
      </CardText>
      <Table striped bordered hover responsive>
        <tbody>
          <tr>
            <td>E-mail</td>
            <td>{user?.email}</td>
          </tr>
          <tr>
            <td>Телефон</td>
            <td>{user?.phone}</td>
          </tr>
          <tr>
            <td>Никнейм</td>
            <td>{user?.nickname}</td>
          </tr>
          <tr>
            <td>Роль</td>
            <td>{isAdmin ? 'Администратор' : 'Клиент'}</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default ProfileInfoCard;
