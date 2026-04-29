import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MovementEntity } from "./movement.entity";
import { StockMovement } from "./interfaces";

@Injectable()
export class MovementRepository {
  constructor(
    @InjectRepository(MovementEntity)
    private readonly repo: Repository<MovementEntity>,
  ) {}

  async saveAll(movements: StockMovement[], batchId: string): Promise<void> {
    const entities = movements.map((m) => {
      const entity = new MovementEntity();
      entity.timestamp = m.timestamp;
      entity.productId = m.productId;
      entity.productName = m.productName;
      entity.type = m.type;
      entity.quantity = m.quantity;
      entity.uploadBatch = batchId;
      return entity;
    });

    await this.repo.save(entities);
  }

  async findByBatch(batchId: string): Promise<MovementEntity[]> {
    return this.repo.find({ where: { uploadBatch: batchId } });
  }

  async findAll(): Promise<MovementEntity[]> {
    return this.repo.find();
  }
}
