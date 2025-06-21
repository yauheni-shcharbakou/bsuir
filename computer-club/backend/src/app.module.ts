import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { typeormConfig } from './configs/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { EventModule } from './modules/event/event.module';
import { OptionModule } from './modules/option/option.module';
import { OrderModule } from './modules/order/order.module';
import { ComputerTypeModule } from './modules/computer-type/computer-type.module';
import { RoomTypeModule } from './modules/room-type/room-type.module';
import { BookingModule } from './modules/booking/booking.module';
import { ReviewModule } from './modules/review/review.module';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    UserModule,
    EventModule,
    OptionModule,
    OrderModule,
    ComputerTypeModule,
    RoomTypeModule,
    BookingModule,
    ReviewModule,
    RoomModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
