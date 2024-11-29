import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { User } from 'src/user/entities/user.entity';
// import { Comment } from 'src/comment/entities/comment.entity';
// import { Like } from 'src/likes/entities/like.entity';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Like } from '../../likes/entities/like.entity';

@Entity('Articals')
export class Artical {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  body: string;

  @Column({ default: 0 })
  like: number;

  @ManyToOne(() => User, (user) => user.articals)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.article)
  likes: Like[];
}
