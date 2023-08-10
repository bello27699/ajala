import { send200, send400 } from "../../../utils/helpers";
import { DataSource } from "typeorm";
import { RFARepository } from "../../interfaces/repositories/rfa_repository";
import { ResponseModel } from "../../models/response.model";
import { TourApplication } from "../../models/tour/tour_application.entity";
import { RFARequestParams } from "../../models/tour/rfa/rfa_request_params";
import { Participant } from "../../models/tour/participant.entity";

export class RFARepositoryImpl implements RFARepository {
  db: any;
  constructor(db: DataSource) {
    this.db = db.getRepository(TourApplication);
  }
  fetchAllRFA(): Promise<ResponseModel> {
    throw new Error("Method not implemented.");
  }
  fetchRFAByDepartment(deptId: string): Promise<ResponseModel> {
    throw new Error("Method not implemented.");
  }
  FetchStateByZone(zone: string): Promise<ResponseModel> {
    throw new Error("Method not implemented.");
  }
  UpdateZone(state: string): Promise<ResponseModel> {
    throw new Error("Method not implemented.");
  }

  async createApplication(params: RFARequestParams): Promise<ResponseModel> {
    try {
      let application = await this.db.findOneBy({
        title_of_trip: params.title,
      });

      if (application) {
        return send400(
          "This tour application has previously been submitted",
          null
        );
      } else {
        let tourApplication = new TourApplication();

        let participants = [];
        tourApplication.title_of_trip = params.title;
        tourApplication.country = params.country;
        tourApplication.state = params.state;
        tourApplication.lga = params.lga;
        tourApplication.venue = params.venue;
        tourApplication.type = params.type;
        tourApplication.memo_url = params.memo_url;
        tourApplication.description = params.description;

        tourApplication.start_date = params.start_date;
        tourApplication.end_date = params.end_date;
        tourApplication.note_to_approver = params.note_to_approver;
        for (let i = 0; i < params.participants.length; ++i) {
          participants[i] = new Participant();
          participants[i].title = params.participants[i].title;
          participants[i].employee_number =
            params.participants[i].employee_number;
          participants[i].full_name = params.participants[i].full_name;
          participants[i].email_address = params.participants[i].email_address;
          await participants[i].save();
        }
        tourApplication.participants = participants;
        const tour = await tourApplication.save();

        return send200("Tour application has successfully been submited", tour);
      }
    } catch (error: any) {
      return send400(error.message, null);
    }
  }

  searchEmployee(employee_id: number): Promise<ResponseModel> {
    // To be implemented
    throw new Error("Method not implemented.");
  }
}
