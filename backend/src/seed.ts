import "dotenv/config";
import { DataSource } from "typeorm";
import { MovementEntity } from "./inventory/movement.entity";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

async function seed() {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "inventory",
    entities: [MovementEntity],
    synchronize: true,
  });

  await dataSource.initialize();

  const repo = dataSource.getRepository(MovementEntity);
  const csvPath = join(__dirname, "../../inventory.csv");
  const content = readFileSync(csvPath, "utf-8");
  const lines = content.trim().split("\n").slice(1);
  const batchId = randomUUID();

  const entities: MovementEntity[] = [];

  for (const line of lines) {
    const [rawTimestamp, productId, productName, type, rawQuantity] =
      line.split(",");
    const timestamp = Number(rawTimestamp);
    const quantity = Number(rawQuantity);

    if (!Number.isFinite(timestamp) || timestamp <= 0) continue;
    if (!productId || !productName) continue;
    if (type !== "in" && type !== "out") continue;
    if (
      !Number.isFinite(quantity) ||
      !Number.isInteger(quantity) ||
      quantity <= 0
    )
      continue;

    const entity = new MovementEntity();
    entity.timestamp = timestamp;
    entity.productId = productId;
    entity.productName = productName;
    entity.type = type;
    entity.quantity = quantity;
    entity.uploadBatch = batchId;
    entities.push(entity);
  }

  await repo.save(entities);
  console.log(`Seeded ${entities.length} movements (batch: ${batchId})`);
  await dataSource.destroy();
}

seed();
