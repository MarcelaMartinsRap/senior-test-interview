# Inventory Tracker

Solução full-stack para o teste técnico de desenvolvedor sênior.

API que processa logs de movimentação de estoque (CSV) e retorna o estado atual do inventário, alertas de estoque baixo e anomalias detectadas.

---

## Tecnologias

| Camada | Stack |
|--------|-------|
| Backend | NestJS, TypeORM, PostgreSQL |
| Frontend | Next.js 15, Tailwind CSS |
| Banco de Dados | PostgreSQL |

---

## Estrutura do Projeto

```
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── main.ts                          # Bootstrap da aplicação
│   │   ├── app.module.ts                    # Módulo raiz com config do TypeORM/PostgreSQL
│   │   ├── seed.ts                          # Script de seed para popular o banco via CSV
│   │   └── inventory/
│   │       ├── inventory.module.ts          # Módulo de inventário (DI)
│   │       ├── inventory.controller.ts      # Endpoints POST e GET /analyze-inventory
│   │       ├── csv-parser.service.ts        # Parsing e validação do CSV
│   │       ├── inventory-analyzer.service.ts # Lógica de negócio (estoque, anomalias)
│   │       ├── movement.entity.ts           # Entidade TypeORM (tabela movements)
│   │       ├── movement.repository.ts       # Repositório de acesso ao banco
│   │       ├── dtos.ts                      # DTOs para response (não expor dados internos)
│   │       └── interfaces.ts               # Tipos/contratos
│   ├── .env.example
│   └── package.json
├── frontend/                # Next.js App
│   ├── app/
│   │   ├── page.tsx                         # Página principal com upload e resultados
│   │   ├── types.ts                         # Interfaces compartilhadas
│   │   └── components/
│   │       ├── file-upload.tsx              # Componente de upload de CSV
│   │       ├── stock-table.tsx              # Tabela de estoque atual
│   │       ├── low-stock-table.tsx          # Tabela de alertas de estoque baixo
│   │       └── anomalies-table.tsx          # Tabela de anomalias
│   ├── .env.example
│   └── package.json
└── inventory.csv            # Arquivo de exemplo
```

---

## Requisitos Atendidos

| Requisito | Status |
|-----------|--------|
| `POST /analyze-inventory` aceita upload CSV | ✅ |
| Retorna `stock` com quantidade atual por produto | ✅ |
| Retorna `low_stock` (< 10 unidades) | ✅ |
| Retorna `anomalies` (estoque negativo em algum momento) | ✅ |
| CSV não precisa estar ordenado por timestamp | ✅ (ordena antes de processar) |
| Linhas inválidas são ignoradas sem crashar | ✅ |
| Persistência em banco de dados (PostgreSQL) | ✅ |
| DTOs para não expor dados internos na response | ✅ |
| Frontend para visualização dos resultados | ✅ |
| Variáveis sensíveis em `.env` (não commitadas) | ✅ |

---

## Como Rodar

### Pré-requisitos

- Node.js 18+
- PostgreSQL rodando localmente

### 1. Criar o banco

```bash
PGPASSWORD=postgres createdb -U postgres -h localhost inventory
```

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run build
npm run seed        # Popular banco com inventory.csv
npm run start:dev   # Roda na porta 3001
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev         # Roda na porta 3000
```

### 4. Testar via curl

```bash
curl -X POST http://localhost:3001/analyze-inventory \
  -F "file=@inventory.csv"
```

---

## Resposta Esperada

```json
{
  "stock": [
    { "product_id": "A1", "product_name": "Widget", "quantity": 55 },
    { "product_id": "B2", "product_name": "Gadget", "quantity": 2 },
    { "product_id": "C3", "product_name": "Doohickey", "quantity": 15 },
    { "product_id": "D4", "product_name": "Thingamajig", "quantity": 15 },
    { "product_id": "E5", "product_name": "Whatsit", "quantity": 5 }
  ],
  "low_stock": [
    { "product_id": "B2", "product_name": "Gadget", "quantity": 2 },
    { "product_id": "E5", "product_name": "Whatsit", "quantity": 5 }
  ],
  "anomalies": [
    { "product_id": "C3", "product_name": "Doohickey", "message": "Stock went negative" }
  ]
}
```

---

## Decisões Técnicas

- **NestJS**: Framework enterprise-ready com DI nativo, ideal para demonstrar arquitetura limpa e modular.
- **TypeORM + PostgreSQL**: Persistência real dos movimentos para consultas futuras via `GET /analyze-inventory`.
- **DTOs**: Camada de serialização que garante que dados internos (batch IDs, timestamps de processamento) nunca vazem na response.
- **CSV Parser manual**: Sem dependências externas, validação rigorosa de cada campo com skip gracioso de linhas inválidas.
- **Ordenação por timestamp**: O CSV pode vir desordenado; ordenamos antes de calcular o estoque para detectar anomalias corretamente.
- **Seed script**: Permite popular o banco rapidamente para testes.
- **Frontend Next.js**: Interface de upload com feedback visual, tabelas coloridas por categoria (estoque, alertas, anomalias).
- **Variáveis de ambiente**: Separação de configuração sensível via `.env` com `.env.example` commitado como template.
