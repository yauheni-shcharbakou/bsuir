import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './option';
import { OptionSubscriber } from './subscribers/option.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  controllers: [OptionController],
  providers: [OptionService, OptionSubscriber],
  exports: [OptionService],
})
export class OptionModule {}
