import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ContactModule } from './contact/contact.module';
import { PhoneNumberModule } from './phone-num/phone-num.module';

@Module({
  imports: [ContactModule, PhoneNumberModule, GraphQLModule.forRoot(
    {
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      cors: {
        origin: 'http://localhost:4200',
        credentials: true
      },
    }
  ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1235789',
      database: 'postgres',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
