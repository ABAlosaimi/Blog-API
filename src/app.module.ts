import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticalModule } from './articale/artical.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { LikesModule } from './likes/likes.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: '/masar-blog/development.env' });
console.log(process.env.DB_TYPE);

@Module({
  imports: [
    ArticalModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresql://blog_db_staging_user:Var9ReeMW6MWz7NjgczY4DSqJrFhLOsv@dpg-ct4t7lo8fa8c73br5isg-a.singapore-postgres.render.com/blog_db_staging',
      port: 5432,
      username: 'blog_db_staging_user',
      password: 'Var9ReeMW6MWz7NjgczY4DSqJrFhLOsv',
      database: 'blog_db_staging',
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    }),
    UserModule,
    AuthModule,
    CommentModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
