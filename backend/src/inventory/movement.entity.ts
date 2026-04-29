import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("movements")
export class MovementEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  timestamp!: number;

  @Column({ name: "product_id" })
  productId!: string;

  @Column({ name: "product_name" })
  productName!: string;

  @Column()
  type!: string;

  @Column()
  quantity!: number;

  @Column({ name: "upload_batch" })
  uploadBatch!: string;
}
