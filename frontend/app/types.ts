export interface ProductStock {
  product_id: string;
  product_name: string;
  quantity: number;
}

export interface Anomaly {
  product_id: string;
  product_name: string;
  message: string;
}

export interface InventorySummary {
  stock: ProductStock[];
  low_stock: ProductStock[];
  anomalies: Anomaly[];
}
