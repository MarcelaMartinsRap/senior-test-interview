"use client";

import { useState } from "react";
import { InventorySummary } from "./types";
import { FileUpload } from "./components/file-upload";
import { StockTable } from "./components/stock-table";
import { LowStockTable } from "./components/low-stock-table";
import { AnomaliesTable } from "./components/anomalies-table";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function Home() {
  const [summary, setSummary] = useState<InventorySummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(file: File) {
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/analyze-inventory`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message || "Upload failed");
      }

      const data: InventorySummary = await response.json();
      setSummary(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Tracker</h1>

        <FileUpload onUpload={handleUpload} loading={loading} />

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-red-800">{error}</div>
        )}

        {summary && (
          <div className="space-y-6">
            <StockTable items={summary.stock} />
            <LowStockTable items={summary.low_stock} />
            <AnomaliesTable items={summary.anomalies} />
          </div>
        )}
      </div>
    </main>
  );
}
