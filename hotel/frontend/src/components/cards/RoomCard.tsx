import { FC } from 'react';
import { RoomCardProps } from '../../abstractions/props';
import { PrimaryText } from '../styled/typography';
import { Divider, Typography } from '@mui/material';
import BaseCard from './BaseCard';

const RoomCard: FC<RoomCardProps> = ({ room, onPick, onDelete }) => {
  return (
    <BaseCard onPick={() => onPick(room)} onDelete={() => onDelete(room.id)}>
      <PrimaryText>Type: {room.type.name}</PrimaryText>
      <PrimaryText>Address: {room.building.address}</PrimaryText>
      <Divider />
      <Typography>Population: {room.population}</Typography>
      <Typography>Status: {room.isFree ? 'free' : 'booked'}</Typography>
      {!room.isFree && <Typography>Booked until: {room.bookedUntil}</Typography>}
    </BaseCard>
  );
};

export default RoomCard;
