import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';


@Entity()
export class Fight {
  @PrimaryGeneratedColumn()
  id: string;


  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false})
  approved: boolean;

  @Column()
  @CreateDateColumn()
  created: Date

  @Column()
  age: number;

  @Column()
  wins: number;

  @Column()
  losses: number;

  @Column()
  draws: number;

  @Column()
  rounds: number;

  @Column()
  price: number;

  @ManyToOne(() => User, user => user.fights)
  user: User;
  
}

