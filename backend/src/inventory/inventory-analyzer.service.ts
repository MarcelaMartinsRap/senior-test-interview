import { Injectable } from "@nestjs/common";
import {
  StockMovement,
  InventorySummary,
  ProductStock,
  Anomaly,
} from "./interfaces";

const LOW_STOCK_THRESHOLD = 10;

interface ProductState {
  productId: string;
  productName: string;
  currentQuantity: number;
  wentNegative: boolean;
}

@Injectable()
export class InventoryAnalyzerService {
  analyze(movements: StockMovement[]): InventorySummary {
    const sorted = [...movements].sort((a, b) => a.timestamp - b.timestamp);
    const productMap = new Map<string, ProductState>();

    for (const movement of sorted) {
      this.processMovement(productMap, movement);
    }

    return this.buildSummary(productMap);
  }

  private processMovement(
    productMap: Map<string, ProductState>,
    movement: StockMovement,
  ): void {
    let state = productMap.get(movement.productId);

    if (!state) {
      state = {
        productId: movement.productId,
        productName: movement.productName,
        currentQuantity: 0,
        wentNegative: false,
      };
      productMap.set(movement.productId, state);
    }

    if (movement.type === "in") {
      state.currentQuantity += movement.quantity;
    } else {
      state.currentQuantity -= movement.quantity;
    }

    if (state.currentQuantity < 0) {
      state.wentNegative = true;
    }
  }

  private buildSummary(
    productMap: Map<string, ProductState>,
  ): InventorySummary {
    const stock: ProductStock[] = [];
    const lowStock: ProductStock[] = [];
    const anomalies: Anomaly[] = [];

    for (const state of productMap.values()) {
      const productStock: ProductStock = {
        product_id: state.productId,
        product_name: state.productName,
        quantity: state.currentQuantity,
      };

      stock.push(productStock);

      if (state.currentQuantity < LOW_STOCK_THRESHOLD) {
        lowStock.push(productStock);
      }

      if (state.wentNegative) {
        anomalies.push({
          product_id: state.productId,
          product_name: state.productName,
          message: "Stock went negative",
        });
      }
    }

    return { stock, low_stock: lowStock, anomalies };
  }
}
