import { InventorySummary, ProductStock, Anomaly } from "./interfaces";

export class ProductStockDto {
  readonly product_id: string;
  readonly product_name: string;
  readonly quantity: number;

  constructor(stock: ProductStock) {
    this.product_id = stock.product_id;
    this.product_name = stock.product_name;
    this.quantity = stock.quantity;
  }
}

export class AnomalyDto {
  readonly product_id: string;
  readonly product_name: string;
  readonly message: string;

  constructor(anomaly: Anomaly) {
    this.product_id = anomaly.product_id;
    this.product_name = anomaly.product_name;
    this.message = anomaly.message;
  }
}

export class InventorySummaryDto {
  readonly stock: ProductStockDto[];
  readonly low_stock: ProductStockDto[];
  readonly anomalies: AnomalyDto[];

  constructor(summary: InventorySummary) {
    this.stock = summary.stock.map((s) => new ProductStockDto(s));
    this.low_stock = summary.low_stock.map((s) => new ProductStockDto(s));
    this.anomalies = summary.anomalies.map((a) => new AnomalyDto(a));
  }
}
