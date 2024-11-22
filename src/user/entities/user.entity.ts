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
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userName: string;

  @Column({ nullable: false })
  //@Index()
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  @IsEmail()
  @Index()
  email: string;

  @Column({ nullable: false })
  @Min(6)
  @Max(12)
  password: string;

  @Column({ default: 0 })
  follow: number;

  @Column({ default: 0 })
  followers: number;

  @OneToMany(() => Artical, (atical) => atical.user, {
    cascade: true,
    nullable: true,
  })
  articals: Artical[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
