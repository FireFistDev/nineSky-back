import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Price } from "libs/entities/prices.entity";
import { EntityManager, Repository } from "typeorm";




@Injectable()
export class AppService {
  constructor(
    private readonly entityManager: EntityManager,
  ) { }

  async getPrices()  : Promise<Price> {
    try {
      const prices = await this.entityManager.findOne(Price , { where: { id: process.env.PRICE_ID }})
      return prices;

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}