import { ChangeEvent, useEffect, useState } from 'react';
import { ReviewPopulated } from '../../../abstractions/models';

export const useReviewCardService = (
  review: ReviewPopulated,
  updateHandler: (id: number, text: string) => Promise<void>,
) => {
  const [text, setText] = useState(review.text);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);

  useEffect(() => setIsSubmitBlocked(() => !isEdit || !text), [isEdit, text]);
  useEffect(() => setText(() => review.text), [review.text]);

  const changeTextHandler = (e: ChangeEvent<HTMLInputElement>) => setText(() => e.target.value);
  const editHandler = () => setIsEdit(() => !isEdit);

  const submitHandler = async () => {
    try {
      await updateHandler(review.id, text);
      setIsEdit(() => false);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    text,
    isEdit,
    isSubmitBlocked,
    changeTextHandler,
    editHandler,
    submitHandler,
  };
};
