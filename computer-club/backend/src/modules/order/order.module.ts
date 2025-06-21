import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OptionModule } from '../option/option.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), OptionModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
