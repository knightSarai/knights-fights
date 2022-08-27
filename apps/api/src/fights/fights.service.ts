import { Injectable, NotFoundException } from '@nestjs/common';
import { GetEstimateDto } from './dtos/get-estimate.dto';

import { PrismaService } from '@knights-fights/prisma'
import { fight as PrismaFight, Prisma} from '@prisma/client'

@Injectable()
export class FightsService {
  constructor(private prisma: PrismaService) {}

  fight(
    fightWhereUniqueInput: Prisma.fightWhereUniqueInput,
  ): Promise<PrismaFight | null> {
    return this.prisma.fight.findUnique({where: fightWhereUniqueInput});
  }

  create(data: Prisma.fightCreateInput) {
    return this.prisma.fight.create({data});
  }

  
  async changeApproval(id: number, approved: boolean) {
    try{
      return await this.prisma.fight.update({
        where: { id },
        data: { approved },
      })
    }catch(error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
           throw new NotFoundException('Fight not found'); 
        }
      }
    }
  }

  async getEstimate({rounds, age, wins, losses, draws}: GetEstimateDto) {
    //Estimate Process
    /* Find fights for the same rounds */
    /* Age is between 3  years */
    /* order by closest record */
    /* wins losses draws 
    * order by wins from  highest to lowest
    * losess from lowest to highest
    * draws from lowest to highest
    * */

     const aggregatedPrice = await this.prisma.$queryRaw<PrismaFight>`
      SELECT ROUND(AVG(price)) AS price
      FROM fight
      WHERE rounds = ${rounds}
      AND age - ${age} BETWEEN -3 AND 3
      AND approved IS true
      ORDER BY
        ABS(wins - ${wins}) ASC,
        ABS(losses - ${losses}) DESC,
        ABS(draws - ${draws}) DESC
      LIMIT 3;
    `

    return aggregatedPrice[0];
  }
}
