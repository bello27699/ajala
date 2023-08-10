import {
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class FacilityProperties extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  property_id: string;

  @Column()
  category: string;

  @Column()
  item: string;

  @Column()
  description: string;

  @Column()
  rate: number;

  @Column()
  quantity: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;
}
