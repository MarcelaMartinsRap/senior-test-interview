---

## Sobre este repositório

Este repositório contém o teste técnico que utilizei em uma entrevista real para vaga de desenvolvedor sênior no exterior. O teste foi resolvido do zero, sem uso de IA, e está documentado em vídeo no YouTube. Se quiser ver como foi a entrevista, confira o vídeo completo:

[Assista ao vídeo da entrevista técnica real ($5000/mês)](https://youtu.be/QNRg8FBc8U0)

No vídeo, explico o raciocínio, mostro a resolução do teste e comento pontos importantes do processo seletivo internacional.

---

# Inventory Tracker – Interview Task

## Overview

In this exercise, you will build a small API service that processes warehouse inventory movement logs and returns the current state of stock.

The service should accept a CSV file containing stock movements and return a summary of current inventory levels, low stock alerts, and any anomalies detected.

The goal of this exercise is to evaluate:

- API design
- data parsing
- clean code structure
- error handling

## Requirements

Implement an API endpoint:

```
POST /analyze-inventory
```

The endpoint should accept a CSV file upload and return the inventory summary.

## CSV Format

| Column | Description |
|--------|-------------|
| `timestamp` | Unix timestamp of the movement |
| `product_id` | Unique product identifier |
| `product_name` | Human-readable product name |
| `type` | Either `in` (stock received) or `out` (stock removed) |
| `quantity` | Number of units moved (positive integer) |

**Example:**

```csv
timestamp,product_id,product_name,type,quantity
1710000001,A1,Widget,in,100
1710000002,A1,Widget,out,30
```

> A sample file `inventory.csv` is included in this repo.

## Expected Response

```json
{
  "stock": [
    { "product_id": "A1", "product_name": "Widget", "quantity": 70 }
  ],
  "low_stock": [
    { "product_id": "B2", "product_name": "Gadget", "quantity": 5 }
  ],
  "anomalies": [
    { "product_id": "C3", "product_name": "Doohickey", "message": "Stock went negative" }
  ]
}
```

- **`stock`** — current quantity for every product
- **`low_stock`** — products with fewer than 10 units remaining
- **`anomalies`** — products that went negative at any point during processing

If there are no low stock items or anomalies, return empty arrays for those fields.

## Notes

- The CSV may not be sorted by timestamp.
- Invalid or malformed rows should be skipped gracefully without crashing the service.
- No database is required — keep everything in memory.

## Example Request

```bash
curl -X POST http://localhost:3000/analyze-inventory \
  -F "file=@inventory.csv"
```

## Implementation

You are free to use **any language or framework** of your choice. Structure the project however you prefer, and include clear instructions in your submission on how to run it locally.
