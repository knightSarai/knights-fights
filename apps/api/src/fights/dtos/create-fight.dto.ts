import { IsNumber, Min, Max } from 'class-validator';

export class CreateFightDto {
  @IsNumber()
  @Min(18)
  @Max(100)
  age: number;

  @IsNumber()
  @Min(0)
  @Max(300)
  wins: number;

  @IsNumber()
  @Min(0)
  @Max(300)
  losses: number;

  @IsNumber()
  @Min(0)
  @Max(300)
  draws: number;

  @IsNumber()
  @Min(0)
  @Max(12)
  rounds: number;

  @IsNumber()
  @Min(0)
  price: number;

}

