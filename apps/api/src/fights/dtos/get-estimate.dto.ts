import { IsNumber, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {

  @Transform(({ value}) => parseInt(value))
  @IsNumber()
  @Min(18)
  @Max(100)
  age: number;

  @Transform(({ value}) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(300)
  wins: number;

  @Transform(({ value}) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(300)
  losses: number;

  @Transform(({ value}) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(300)
  draws: number;

  @Transform(({ value}) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(12)
  rounds: number;
}
