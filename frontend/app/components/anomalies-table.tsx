import { Anomaly } from "../types";

interface AnomaliesTableProps {
  readonly items: Anomaly[];
}

export function AnomaliesTable({ items }: AnomaliesTableProps) {
  if (items.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm">
      <div className="border-b border-red-200 bg-red-50 px-6 py-4">
        <h2 className="text-lg font-semibold text-red-800">🚨 Anomalias</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-red-100 bg-red-50/50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-red-600">
                ID Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-red-600">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-red-600">
                Mensagem
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-100">
            {items.map((item) => (
              <tr key={item.product_id} className="transition hover:bg-red-50">
                <td className="px-6 py-3 text-sm font-medium text-slate-700">
                  {item.product_id}
                </td>
                <td className="px-6 py-3 text-sm text-slate-600">
                  {item.product_name}
                </td>
                <td className="px-6 py-3 text-sm font-medium text-red-600">
                  {item.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
