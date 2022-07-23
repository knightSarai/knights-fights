import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate } from 'class-validator';


@Entity()
export class Fight {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ default: true })
  isActive: boolean;

  @Column()
  @IsDate()
  created: Date
}

