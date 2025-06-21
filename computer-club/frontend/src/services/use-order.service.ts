import { OrderPopulated } from '../abstractions/models';
import { OrderRepository } from '../repositories';
import { useEffect, useState } from 'react';

export const useOrderService = () => {
  const orderRepository = new OrderRepository();

  const [orders, setOrders] = useState<OrderPopulated[]>([]);

  useEffect(() => {
    orderRepository.getAll().then((response: OrderPopulated[]) => setOrders(() => response));
  }, []);

  return {
    orders,
  };
};
