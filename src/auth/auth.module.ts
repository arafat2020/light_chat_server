import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DbModule } from 'src/db/db.module';
import { AuthController } from './auth.controller';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[DbModule]
})
export class AuthModule {}
