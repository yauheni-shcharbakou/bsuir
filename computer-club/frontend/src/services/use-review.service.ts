import { ReviewPopulated } from '../abstractions/models';
import { ReviewRepository, RoomRepository } from '../repositories';
import { ChangeEvent, useEffect, useState } from 'react';

export const useReviewService = (roomId: number, initReviews: ReviewPopulated[]) => {
  const reviewRepository = new ReviewRepository();
  const roomRepository = new RoomRepository();

  const [reviews, setReviews] = useState(initReviews);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);

  const [text, setText] = useState('');

  useEffect(() => setIsSubmitBlocked(() => !text), [text]);

  const changeTextHandler = (e: ChangeEvent<HTMLInputElement>) => setText(() => e.target.value);

  const createHandler = async () => {
    try {
      const review: ReviewPopulated = await roomRepository.createRoomReview(roomId, text);
      setReviews(() => [...reviews, review]);
      setText(() => '');
    } catch (e) {
      console.log(e);
    }
  };

  const updateHandler = async (id: number, text: string) => {
    try {
      const updatedReview: ReviewPopulated = await reviewRepository.update(id, text);

      setReviews(() => {
        return reviews.map((r: ReviewPopulated) => {
          return r.id === updatedReview.id ? updatedReview : r;
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteHandler = (id: number) => {
    return async () => {
      try {
        const deletedId: number = await reviewRepository.delete(id);
        setReviews(() => reviews.filter(({ id: existsId }) => existsId !== deletedId));
      } catch (e) {
        console.log(e);
      }
    };
  };

  return {
    reviews,
    isSubmitBlocked,
    text,
    changeTextHandler,
    createHandler,
    updateHandler,
    deleteHandler,
  };
};
