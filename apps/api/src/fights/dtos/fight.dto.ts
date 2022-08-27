import { Expose, Transform } from 'class-transformer';

export class FightDto {

    @Expose()
    id: number;
    
    @Expose()
    isActive: boolean;

    @Expose()
    approved: boolean;
    
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
    userId: number;
  
}
