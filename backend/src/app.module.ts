import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryModule } from "./inventory/inventory.module";
import { MovementEntity } from "./inventory/movement.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DB_NAME || "inventory",
      entities: [MovementEntity],
      synchronize: true,
    }),
    InventoryModule,
  ],
})
export class AppModule {}
