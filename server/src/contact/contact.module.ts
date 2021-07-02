import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolver';
// import { Upload } from 'src/scalar/upload.scalar';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactResolver, ContactService],
  exports: [ContactService]
})
export class ContactModule { }