import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CsvParserService } from "./csv-parser.service";
import { InventoryAnalyzerService } from "./inventory-analyzer.service";
import { MovementRepository } from "./movement.repository";
import { InventorySummaryDto } from "./dtos";
import { randomUUID } from "node:crypto";

@Controller("analyze-inventory")
export class InventoryController {
  constructor(
    private readonly csvParser: CsvParserService,
    private readonly analyzer: InventoryAnalyzerService,
    private readonly movementRepository: MovementRepository,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async analyzeInventory(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<InventorySummaryDto> {
    if (!file) {
      throw new BadRequestException("A CSV file is required");
    }

    const content = file.buffer.toString("utf-8");
    const movements = this.csvParser.parse(content);
    const batchId = randomUUID();

    await this.movementRepository.saveAll(movements, batchId);

    const summary = this.analyzer.analyze(movements);
    return new InventorySummaryDto(summary);
  }

  @Get()
  async getLatestAnalysis(): Promise<InventorySummaryDto> {
    const entities = await this.movementRepository.findAll();

    const movements = entities.map((e) => ({
      timestamp: e.timestamp,
      productId: e.productId,
      productName: e.productName,
      type: e.type as "in" | "out",
      quantity: e.quantity,
    }));

    const summary = this.analyzer.analyze(movements);
    return new InventorySummaryDto(summary);
  }
}
