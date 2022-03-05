import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumber } from './phoneNumber.entity';
import { PhoneNumberService } from './phoneNumber.service';
import { PhoneNumberResolver } from './phoneNumber.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumber])],
  providers: [PhoneNumberResolver, PhoneNumberService],
})
export class PhoneNumberModule {}
