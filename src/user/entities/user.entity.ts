import { IsEmail, Max, Min } from 'class-validator';
import { Artical } from 'src/articale/entities/artical.entity';
import {
  Column,
  Entity,
  Index,
  //Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { Like } from 'src/likes/entities/like.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  //@Index()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  @IsEmail()
  @Index()
  email: string;

  @Column({ nullable: true })
  @Min(6)
  @Max(12)
  password: string;

  @Column({ default: 0, nullable: true })
  follow: number;

  @Column({ default: 0, nullable: true })
  followers: number;

  @OneToMany(() => Artical, (atical) => atical.user, {
    cascade: true,
    nullable: true,
  })
  articals: Artical[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
