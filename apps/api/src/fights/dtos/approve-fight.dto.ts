import { IsBoolean } from 'class-validator';


export class ApproveFightDto {
  @IsBoolean()
  approved: boolean;
}
