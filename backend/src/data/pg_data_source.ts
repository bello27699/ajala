import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../domain/models/user.entity";
import { Booking } from "../domain/models/booking.entity";
import fs from 'fs'
import { TourApplication } from "..//domain/models/tour/tour_application.entity";
import { Participant } from "..//domain/models/tour/participant.entity";

dotenv.config();

const { PG_HOST, PG_USER, PG_PASSWORD, PG_DB } = process.env;
export const AppDataSource = new DataSource({
  type: "postgres",
  host:PG_HOST,
  port: 5432,
  username: PG_USER,
  password: PG_PASSWORD,
  database: PG_DB,
  ssl:false,
  synchronize: true,
  logging: true,
  entities: [User,Booking,TourApplication,Participant],
  subscribers: [],
  migrations: [],
});
