import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique} from 'typeorm';
import { IsEmail, Length, IsDate } from 'class-validator';


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

  @Column()
  @Length(8)
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  @CreateDateColumn()
  created: Date
}

