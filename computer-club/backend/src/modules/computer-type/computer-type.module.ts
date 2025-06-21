import { Module } from '@nestjs/common';
import { ComputerTypeService } from './computer-type.service';
import { ComputerTypeController } from './computer-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComputerType } from './computer-type';
import { ComputerTypeSubscriber } from './subscribers/computer-type.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([ComputerType])],
  controllers: [ComputerTypeController],
  providers: [ComputerTypeService, ComputerTypeSubscriber],
  exports: [ComputerTypeService],
})
export class ComputerTypeModule {}
