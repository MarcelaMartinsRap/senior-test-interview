import { Anomaly } from "../types";

interface AnomaliesTableProps {
  readonly items: Anomaly[];
}

export function AnomaliesTable({ items }: AnomaliesTableProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="mb-2 text-xl font-semibold text-red-700">Anomalies</h2>
      <table className="w-full border-collapse rounded-md bg-red-50 shadow">
        <thead className="bg-red-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-red-800">
              Product ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-red-800">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-red-800">
              Message
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.product_id} className="border-t border-red-200">
              <td className="px-4 py-2 text-sm">{item.product_id}</td>
              <td className="px-4 py-2 text-sm">{item.product_name}</td>
              <td className="px-4 py-2 text-sm text-red-600">{item.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
