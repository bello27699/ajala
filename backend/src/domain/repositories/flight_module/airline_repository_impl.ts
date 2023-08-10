import { ResponseModel } from "../../models/response.model";
import dotenv from "dotenv";
import { genericResponse, send200, send400 } from "../../../utils/helpers";
import { getUrl, tiqwaConnect } from "../../../data/tiqwa_source";
import { AirlineRepository } from "../../interfaces/repositories/airline_repository";
import fetch from "node-fetch"
dotenv.config();

export class AirlineRepositoryImpl implements AirlineRepository {
  async fetchAirlines(): Promise<ResponseModel> {
    try {
      const response = await fetch(getUrl("airlines"), tiqwaConnect("GET",{}));
      const { status } = response; 
      const data = await response.json();
      return genericResponse(status,data.message,data)
    } catch (error: any) {
      return send400(error.message, null);
    }
  }
}
