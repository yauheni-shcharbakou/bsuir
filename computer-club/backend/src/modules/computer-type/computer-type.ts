import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ComputerType {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column({ default: '' })
  ram: string;

  @ApiProperty()
  @Column({ default: '' })
  cpu: string;

  @ApiProperty()
  @Column({ default: '' })
  gpu: string;
}
