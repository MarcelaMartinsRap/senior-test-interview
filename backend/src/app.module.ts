import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryModule } from "./inventory/inventory.module";
import { MovementEntity } from "./inventory/movement.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "better-sqlite3",
      database: process.env.DATABASE_PATH || "inventory.db",
      entities: [MovementEntity],
      synchronize: true,
    }),
    InventoryModule,
  ],
})
export class AppModule {}
