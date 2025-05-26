import { Module } from '@nestjs/common';
import { MpecsModule } from './mpecs/mpecs.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        SWAGGER_SERVER_HOST: Joi.string().required(),
        CORS_ORIGINS: Joi.string().required(),
      }),
    }),
    MpecsModule,
  ],
})
export class AppModule {}
