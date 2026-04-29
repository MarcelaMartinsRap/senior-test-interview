import { ProductStock } from "../types";

interface StockTableProps {
  readonly items: ProductStock[];
}

export function StockTable({ items }: StockTableProps) {
  return (
    <section>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">
        Current Stock
      </h2>
      <table className="w-full border-collapse rounded-md bg-white shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Product ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Name
            </th>
            <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.product_id} className="border-t">
              <td className="px-4 py-2 text-sm">{item.product_id}</td>
              <td className="px-4 py-2 text-sm">{item.product_name}</td>
              <td className="px-4 py-2 text-right text-sm">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
