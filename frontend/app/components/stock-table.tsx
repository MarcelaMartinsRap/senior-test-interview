import { ProductStock } from "../types";

interface StockTableProps {
  readonly items: ProductStock[];
}

export function StockTable({ items }: StockTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-800">
          📊 Estoque Atual
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                ID Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Nome
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Quantidade
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr
                key={item.product_id}
                className="transition hover:bg-slate-50"
              >
                <td className="px-6 py-3 text-sm font-medium text-slate-700">
                  {item.product_id}
                </td>
                <td className="px-6 py-3 text-sm text-slate-600">
                  {item.product_name}
                </td>
                <td className="px-6 py-3 text-right text-sm font-semibold text-slate-900">
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
