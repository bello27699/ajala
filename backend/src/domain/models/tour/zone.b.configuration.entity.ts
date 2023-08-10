// Flight booking entity
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class ZoneBConfig extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  zone: string;

  @Column()
  cadre: string;

  @Column()
  transportation: number;

  @Column()
  accomodation: number;

  @Column()
  feeding: number;

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
