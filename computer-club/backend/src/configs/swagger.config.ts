import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('REST API компьютерного клуба')
  .setDescription('Документация REST API информационной системы для обеспечения работы компьютерного клуба')
  .setVersion('1.0')
  .build();
