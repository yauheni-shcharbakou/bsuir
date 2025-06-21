import { FC } from 'react';
import { BuildingCardProps } from '../../abstractions/props';
import { PrimaryText } from '../styled/typography';
import { Typography } from '@mui/material';
import BaseCard from './BaseCard';

const BuildingCard: FC<BuildingCardProps> = ({ building, onPick, onDelete }) => {
  return (
    <BaseCard onPick={() => onPick(building)} onDelete={() => onDelete(building.id)}>
      <PrimaryText>Address: {building.address}</PrimaryText>
      <Typography>Rooms amount: {building.rooms.length}</Typography>
    </BaseCard>
  );
};

export default BuildingCard;
