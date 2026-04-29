import { ProductStock } from "../types";

interface LowStockTableProps {
  readonly items: ProductStock[];
}

export function LowStockTable({ items }: LowStockTableProps) {
  if (items.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm">
      <div className="border-b border-amber-200 bg-amber-50 px-6 py-4">
        <h2 className="text-lg font-semibold text-amber-800">
          ⚠️ Alertas de Estoque Baixo
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-amber-100 bg-amber-50/50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-amber-600">
                ID Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-amber-600">
                Nome
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-amber-600">
                Quantidade
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-100">
            {items.map((item) => (
              <tr
                key={item.product_id}
                className="transition hover:bg-amber-50"
              >
                <td className="px-6 py-3 text-sm font-medium text-slate-700">
                  {item.product_id}
                </td>
                <td className="px-6 py-3 text-sm text-slate-600">
                  {item.product_name}
                </td>
                <td className="px-6 py-3 text-right text-sm font-bold text-amber-700">
                  {item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
