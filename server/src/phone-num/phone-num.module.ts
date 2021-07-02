import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumberService } from './phone.num.service';
import { PhoneNumberResolver } from './phone-num.resolver';
import { ContactModule } from 'src/contact/contact.module';
import { PhoneNumber } from './entities/phone-num.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumber]), ContactModule],
  providers: [PhoneNumberService, PhoneNumberResolver]
})
export class PhoneNumberModule { }