import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticalModule } from './articale/artical.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ArticalModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE,
      host: process.env.HOST,
      port: process.env.DB_PORT,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
