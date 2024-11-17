import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticalModule } from './articale/artical.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { env } from 'process';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ArticalModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.HOST,
      port: parseInt(env.DB_PORT),
      username: env.USERNAME,
      password: env.PASSWORD,
      database: env.DATABASE,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    }),
    UserModule,
    AuthModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
