import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommonResponseInterceptor } from './common-response/common-response.interceptor';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://tothuy:T123456%40@cluster0.zqvdu.mongodb.net/congthongtin?retryWrites=true&w=majority'),
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CommonResponseInterceptor,
    }
  ],
})
export class AppModule {}
