// Flight booking entity
import {
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  
  @Column({
    type: "jsonb",
   
    nullable: true,
  })
  inbound?: object[];

  @Column({
    type: "jsonb",
  
    nullable: true,
  })
  outbound?: object[];

  @Column({ nullable: false })
  reference: String;

  @Column()
  guid: string

  @Column({default:false})
  isPayed: boolean

  @Column({
    type: "jsonb",
    nullable: true,
  })
  passengers?: object[];

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
