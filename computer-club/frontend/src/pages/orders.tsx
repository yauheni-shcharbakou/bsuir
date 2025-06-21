import type { NextPage } from 'next';
import Layout from '../components/layout';
import { Col } from 'reactstrap';
import { RouteTitle } from '../constants/enums';
import { useAuthService, useOrderService } from '../services';
import { OrderPopulated } from '../abstractions/models';
import OrderCard from '../components/cards/order-card';
import AppBar from '../components/app-bar/app-bar';

const OrdersPage: NextPage = () => {
  const { isAuth, isAdmin, logoutHandler } = useAuthService();
  const { orders } = useOrderService();

  return (
    <Layout title={RouteTitle.ORDERS}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <h2 className="text-center pt-1">{RouteTitle.ORDERS}</h2>
        <Col className="py-2">
          {orders.map((order: OrderPopulated) => (
            <OrderCard key={order.id.toString()} order={order} />
          ))}
        </Col>
      </div>
    </Layout>
  );
};

export default OrdersPage;
