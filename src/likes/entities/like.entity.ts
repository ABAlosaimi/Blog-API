import { Artical } from 'src/articale/entities/artical.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Artical, (article) => article.likes)
  @JoinColumn({ name: 'article_id', referencedColumnName: 'id' })
  article: Artical;
}
