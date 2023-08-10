import { ResponseModel } from "../../models/response.model";


export interface AirlineRepository {
    fetchAirlines(): Promise<ResponseModel>;
}