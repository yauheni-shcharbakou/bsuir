import { FC } from 'react';
import { OptionCardProps } from '../../abstractions/props';
import { PrimaryText } from '../styled/typography';
import { Typography } from '@mui/material';
import BaseCard from './BaseCard';

const OptionCard: FC<OptionCardProps> = ({ option, onPick, onDelete }) => {
  return (
    <BaseCard onPick={() => onPick(option)} onDelete={() => onDelete(option.id)}>
      <PrimaryText>Name: {option.name}</PrimaryText>
      <Typography>Price: {option.price}$</Typography>
    </BaseCard>
  );
};

export default OptionCard;
