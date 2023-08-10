// Flight booking entity
import {
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  AfterLoad,
  BeforeUpdate,
} from "typeorm";
import { Role } from "./types/roles";
import bcrypt from "bcryptjs";

let tempPassword: string;

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: Role.USER })
  role: Role;

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

  @AfterLoad()
  private loadTempPassword(): void {
    tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    // cheack if that password changing or not
    console.log("harshing password via typeorm hooks");
    if (tempPassword !== this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        throw "there are some issiue in the hash";
      }
    }
  }

  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    console.log('comparing password')
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
