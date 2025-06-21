import { Module } from '@nestjs/common';
import { RoomController } from './controllers/room.controller';
import { RoomService } from './services/room.service';
import { ReviewModule } from '../review/review.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room';
import { RoomTypeModule } from '../room-type/room-type.module';
import { ComputerTypeModule } from '../computer-type/computer-type.module';
import { Computer } from './entities/computer';
import { ComputerController } from './controllers/computer.controller';
import { ComputerService } from './services/computer.service';
import { ComputerSubscriber } from './subscribers/computer.subscriber';
import { RoomSubscriber } from './subscribers/room.subscriber';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Computer]),
    ReviewModule,
    RoomTypeModule,
    ComputerTypeModule,
    BookingModule,
  ],
  controllers: [RoomController, ComputerController],
  providers: [RoomService, ComputerService, ComputerSubscriber, RoomSubscriber],
})
export class RoomModule {}
