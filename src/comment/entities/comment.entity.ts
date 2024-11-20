import { User } from 'src/user/entities/user.entity';
import { Artical } from 'src/articale/entities/artical.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('Comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  body: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Artical)
  @JoinColumn({ name: 'article_id', referencedColumnName: 'id' })
  article: Artical;
}