import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Participant } from "./participant.entity";

@Entity()
export class TourApplication extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title_of_trip: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  lga: string;

  @Column()
  venue: string;

  @Column()
  type: string;

  @Column()
  memo_url: string;

  @Column()
  description: string;

  @OneToMany(() => Participant, (participant) => participant.employee_number)
  @JoinColumn()
  participants: Participant[];

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({ default: "" })
  note_to_approver: string;

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
