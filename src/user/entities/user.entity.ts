import { IsEmail, Max, Min } from 'class-validator';
import { Artical } from 'src/articale/entities/artical.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  @IsEmail()
  email: string;

  @Column()
  @Min(6)
  @Max(12)
  password: string;

  @Column({ nullable: true })
  follow: number;

  @Column({ nullable: true })
  followers: number;

  @OneToMany(() => Artical, (atical) => atical.user, {
    cascade: true,
    nullable: true,
  })
  articals: Artical[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
