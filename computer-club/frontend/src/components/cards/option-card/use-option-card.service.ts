import { ChangeEvent, useEffect, useState } from 'react';
import { OrderRepository } from '../../../repositories';
import { useRouter } from 'next/router';
import { Route } from '../../../constants/enums';
import { Option } from '../../../abstractions/models';

export const useOptionCardService = (option: Option) => {
  const orderRepository = new OrderRepository();

  const { push } = useRouter();

  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);

  useEffect(() => setIsSubmitBlocked(() => !amount || !price), [amount, price]);
  useEffect(() => setPrice(() => amount * option.price), [amount, option.price]);

  const changeAmountHandler = (e: ChangeEvent<HTMLInputElement>) => setAmount(() => +e.target.value || 0);

  const submitHandler = async () => {
    try {
      await orderRepository.create({ option: option.id, amount });
      setAmount(() => 0);
      setPrice(() => 0);
      await push(Route.ORDERS);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    amount,
    price,
    isSubmitBlocked,
    changeAmountHandler,
    submitHandler,
  };
};
