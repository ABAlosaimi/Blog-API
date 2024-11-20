import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity('following')
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @ManyToMany(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  followerId: number;

  @Column({ nullable: true })
  @JoinColumn({ name: 'followed_user_id', referencedColumnName: 'id' })
  followedId: number;
}
