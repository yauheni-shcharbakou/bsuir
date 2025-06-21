import { FC } from 'react';
import { TypeCardProps } from '../../abstractions/props';
import { PrimaryText } from '../styled/typography';
import { Typography } from '@mui/material';
import BaseCard from './BaseCard';

const TypeCard: FC<TypeCardProps> = ({ type, onPick, onDelete }) => {
  return (
    <BaseCard onPick={() => onPick(type)} onDelete={() => onDelete(type.id)}>
      <PrimaryText>Name: {type.name}</PrimaryText>
      <Typography>Price: {type.price}$</Typography>
      <Typography>Places: {type.places}</Typography>
      <Typography>
        {type.options.length
          ? 'Options: ' + type.options.map(({ name }) => name).join(', ')
          : 'No options'}
      </Typography>
    </BaseCard>
  );
};

export default TypeCard;
