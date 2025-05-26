import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MpecsModule } from './mpecs/mpecs.module';

@Module({
  imports: [MpecsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
