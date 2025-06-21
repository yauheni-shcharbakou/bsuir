import { Event } from '../abstractions/models';
import { EventRepository } from '../repositories';
import { ChangeEvent, useEffect, useState } from 'react';
import { DEFAULT_EDITED_ID } from '../constants/common';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Route } from '../constants/enums';

export const useEventService = (initEvents: Event[]) => {
  const { pathname } = useRouter();
  const eventRepository = new EventRepository();

  const [events, setEvents] = useState(initEvents);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);
  const [editedId, setEditedId] = useState(DEFAULT_EDITED_ID);
  const [isEdit, setIsEdit] = useState(false);

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (pathname === Route.EVENTS) {
      eventRepository.getByUser().then((response: Event[]) => setEvents(() => response));
    }
  }, []);

  useEffect(() => {
    const newValue: boolean = isEdit ? !name : !name || date.getTime() <= new Date().getTime();
    setIsSubmitBlocked(() => newValue);
  }, [name, date]);

  useEffect(() => setIsEdit(() => editedId !== DEFAULT_EDITED_ID), [editedId]);

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(() => e.target.value);

  const changeDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(() => new Date(Date.parse(e.target.value)));
  };

  const pickHandler = (event: Event) => {
    return () => {
      setEditedId(() => event.id);
      setName(() => event.name);
      setDate(() => new Date(Date.parse(event.date)));
    };
  };

  const readHandler = (id: number) => {
    return async () => {
      await eventRepository.updateSeenBy(id);
      setEvents(() => events.map((e: Event) => (e.id === id ? { ...e, isNew: false } : e)));
    };
  };

  const clearForms = () => {
    setEditedId(() => DEFAULT_EDITED_ID);
    setName(() => '');
    setDate(() => new Date());
  };

  const submitHandler = async () => {
    try {
      const optionDto: Partial<Event> = { name, date: moment(date).format() };

      const event: Event = isEdit
        ? await eventRepository.updateInfo(editedId, optionDto)
        : await eventRepository.create(optionDto);

      if (isEdit) {
        setEvents(() => {
          return events.map((e: Event) => {
            return e.id === editedId ? event : e;
          });
        });
      } else {
        setEvents(() => [...events, event]);
      }

      clearForms();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteHandler = (id: number) => {
    return async () => {
      try {
        const deletedId: number = await eventRepository.delete(id);
        setEvents(() => events.filter(({ id: existsId }) => existsId !== deletedId));
      } catch (e) {
        console.log(e);
      }
    };
  };

  return {
    events,
    isSubmitBlocked,
    isEdit,
    name,
    date,
    changeNameHandler,
    changeDateHandler,
    pickHandler,
    readHandler,
    submitHandler,
    deleteHandler,
  };
};
