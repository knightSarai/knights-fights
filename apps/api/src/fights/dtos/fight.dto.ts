import { Expose, Transform } from 'class-transformer';

export class FightDto {

    @Expose()
    @Transform(value => value.toString())
    id: number;
    
    @Expose()
    isActive: boolean;
    
    @Expose()
    created: Date;
    
    @Expose()
    age: number;
    
    @Expose()
    wins: number;
    
    @Expose()
    losses: number;
    
    @Expose()
    draws: number;
    
    @Expose()
    rounds: number;
    
    @Expose()
    price: number;
    
    @Expose()
    @Transform(({obj}) => obj.user.id)
    userId: number;
  
}
