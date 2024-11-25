import { User } from '../../user/entities/user.entity';
import { Artical } from '../../articale/entities/artical.entity';
import {
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';

@Entity()
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
