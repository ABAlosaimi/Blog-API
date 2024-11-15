import { Module } from '@nestjs/common';
import { ArticalService } from './artical.service';
import { ArticalController } from './artical.controller';
import { Artical } from './entities/artical.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artical]), UserModule],
  controllers: [ArticalController],
  providers: [ArticalService],
  exports: [TypeOrmModule],
})
export class ArticalModule {}
