import { ProductStock } from "../types";

interface LowStockTableProps {
  readonly items: ProductStock[];
}

export function LowStockTable({ items }: LowStockTableProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="mb-2 text-xl font-semibold text-yellow-700">
        Low Stock Alerts
      </h2>
      <table className="w-full border-collapse rounded-md bg-yellow-50 shadow">
        <thead className="bg-yellow-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-yellow-800">
              Product ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-yellow-800">
              Name
            </th>
            <th className="px-4 py-2 text-right text-sm font-medium text-yellow-800">
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.product_id} className="border-t border-yellow-200">
              <td className="px-4 py-2 text-sm">{item.product_id}</td>
              <td className="px-4 py-2 text-sm">{item.product_name}</td>
              <td className="px-4 py-2 text-right text-sm font-bold text-yellow-700">
                {item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
