import { Injectable } from "@nestjs/common";
import { StockMovement, MovementType } from "./interfaces";

@Injectable()
export class CsvParserService {
  parse(content: string): StockMovement[] {
    const lines = content.trim().split("\n");
    const dataLines = lines.slice(1);

    return dataLines.reduce<StockMovement[]>((movements, line) => {
      const movement = this.parseLine(line);
      if (movement) {
        movements.push(movement);
      }
      return movements;
    }, []);
  }

  private parseLine(line: string): StockMovement | null {
    const columns = line.split(",");

    if (columns.length !== 5) {
      return null;
    }

    const [rawTimestamp, productId, productName, type, rawQuantity] = columns;
    const timestamp = Number(rawTimestamp);
    const quantity = Number(rawQuantity);

    if (!this.isValidTimestamp(timestamp)) return null;
    if (!productId || !productName) return null;
    if (!this.isValidType(type)) return null;
    if (!this.isValidQuantity(quantity)) return null;

    return {
      timestamp,
      productId,
      productName,
      type: type as MovementType,
      quantity,
    };
  }

  private isValidTimestamp(value: number): boolean {
    return Number.isFinite(value) && value > 0;
  }

  private isValidType(value: string): boolean {
    return value === "in" || value === "out";
  }

  private isValidQuantity(value: number): boolean {
    return Number.isFinite(value) && Number.isInteger(value) && value > 0;
  }
}
