import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';
import { ConactResolver } from './contact.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ConactResolver, ContactService],
  exports: [ContactService],
})
export class ContactsModule {}
