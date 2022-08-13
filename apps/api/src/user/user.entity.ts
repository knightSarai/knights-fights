import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { Fight } from '../fights/fight.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3)
  username: string;


  @Column({unique: true})
  @IsEmail()
  email: string;

  @Column({ default: true})
  admin: boolean;

  @Column()
  @Length(8)
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  @CreateDateColumn()
  created: Date

  @OneToMany(() => Fight, fight => fight.user)
  fights: Fight[];
}

