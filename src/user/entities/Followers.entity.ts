import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity('followers')
export class Followers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @ManyToMany(() => User)
  @JoinColumn({ name: 'follower_id', referencedColumnName: 'id' })
  followerid: number;

  @Column({ nullable: true })
  @JoinColumn({ name: 'followed_user_id', referencedColumnName: 'id' })
  followedid: number;
}
