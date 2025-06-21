import { useState } from 'react';

export const useAccordionService = (defaultOpenedId = '') => {
  const [opened, setOpened] = useState(defaultOpenedId);

  const toggle = (id: string) => {
    setOpened(opened === id ? '' : id);
  };

  return {
    opened,
    toggle,
  };
};
