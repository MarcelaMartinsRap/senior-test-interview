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
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="flex items-center justify-between border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              📦 Rastreador de Inventário
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Faça upload de um arquivo CSV para analisar movimentações de
              estoque
            </p>
          </div>
        </header>

        <FileUpload onUpload={handleUpload} loading={loading} />

        {error && (
          <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <span className="text-lg">⚠️</span>
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {summary && (
          <div className="grid gap-8">
            <StockTable items={summary.stock} />
            <div className="grid gap-8 md:grid-cols-2">
              <LowStockTable items={summary.low_stock} />
              <AnomaliesTable items={summary.anomalies} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
