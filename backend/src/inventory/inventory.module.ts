import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryController } from "./inventory.controller";
import { CsvParserService } from "./csv-parser.service";
import { InventoryAnalyzerService } from "./inventory-analyzer.service";
import { MovementRepository } from "./movement.repository";
import { MovementEntity } from "./movement.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MovementEntity])],
  controllers: [InventoryController],
  providers: [CsvParserService, InventoryAnalyzerService, MovementRepository],
})
export class InventoryModule {}
