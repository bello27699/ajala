import { RFARequestParams } from "@/domain/models/tour/rfa/rfa_request_params";
import { ResponseModel } from "../../models/response.model";

export interface RFARepository {
  createApplication(params: RFARequestParams): Promise<ResponseModel>;
  searchEmployee(employee_id: number): Promise<ResponseModel>;
  fetchAllRFA(): Promise<ResponseModel>;
  fetchRFAByDepartment(deptId: string): Promise<ResponseModel>;
  FetchStateByZone(zone: string): Promise<ResponseModel>;
  UpdateZone(state: string): Promise<ResponseModel>;
}
