import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Price } from "libs/entities/prices.entity";
import { Repository } from "typeorm";




@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Price)
    private PriceRepostiry: Repository<Price>,

  ) {}

  async getPrices() { 
    try {
      return   await this.PriceRepostiry.findOne({where : { id : process.env.PRICE_ID}})
    } catch (error) {
        
    }
  }
}