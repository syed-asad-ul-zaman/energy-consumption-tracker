import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { APP_FILTER } from '@nestjs/core';
import { GqlHttpExceptionFilter } from './filters/gql-http-exception.filter';
import { MeasurementModule } from './measurement/measurement.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphQL/schema.gql'),
      formatError: (error) => {
        return {
          message: error.message,
          extensions: {
            code: error.extensions?.code,
            status: error.extensions?.status,
          },
        };
      },
    }),
    PrismaModule,
    MeasurementModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: GqlHttpExceptionFilter },
  ],
})
export class AppModule {}
