import {
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
//import { User } from './user.entity';
@Entity('following')
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  followerId: number;

  @JoinColumn({ name: 'followed_user_id', referencedColumnName: 'id' })
  followedId: number;
}
