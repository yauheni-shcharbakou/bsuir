import { Module } from '@nestjs/common';
import { RoomTypeController } from './room-type.controller';
import { RoomTypeService } from './room-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './room-type';
import { RoomTypeSubscriber } from './subscribers/room-type.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType])],
  controllers: [RoomTypeController],
  providers: [RoomTypeService, RoomTypeSubscriber],
  exports: [RoomTypeService],
})
export class RoomTypeModule {}
