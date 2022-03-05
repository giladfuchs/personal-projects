import { Module } from '@nestjs/common';
import { ContactsModule } from './contacts/contacts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { PhoneNumberModule } from './phoneNumber/phoneNumber.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
    ContactsModule,
    PhoneNumberModule,
    PhotoModule,
  ],
})
export class AppModule {}
