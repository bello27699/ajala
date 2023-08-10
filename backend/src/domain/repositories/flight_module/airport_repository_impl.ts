import { ResponseModel } from "../../models/response.model";
import dotenv from "dotenv";
import { genericResponse, send200, send400 } from "../../../utils/helpers";
import { AirportRepository } from "../../interfaces/repositories/airport_repository";
import { getUrl, tiqwaConnect } from "../../../data/tiqwa_source";
import fetch from "node-fetch";
import { FlightOrderBookingParams } from "../../models/types/flight_order_booking";
import { validateFlightOrderBookingRequestParams } from "../../../utils/validator/flight_order_booking_validator";
import { cbdcGqlConnect, getCBDCgql } from "../../../data/cbdc_data_source";
import { invoiceContent } from "../../../data/gql/invoice_query_mut";
import { Booking } from "../../models/booking.entity";
import { DataSource } from "typeorm";
dotenv.config();

export class AirportRepositoryImpl implements AirportRepository {
  db: DataSource | any;
  constructor(db: DataSource) {
    this.db = db.getRepository(Booking);
  }
  async flightOrderBooking(
    flightOrderBookingParams: FlightOrderBookingParams
  ): Promise<ResponseModel> {
    console.log(flightOrderBookingParams);

  
    let isParamsValid = validateFlightOrderBookingRequestParams(
      Object.keys(flightOrderBookingParams)
        .filter((key) => key !== "_csrf")
        .reduce((obj, key) => {
          obj[key] = flightOrderBookingParams[key];
          return obj;
        }, {})
    );
    console.log(isParamsValid.error);

    if (isParamsValid.error) {
      console.log(isParamsValid);
      return send400(isParamsValid.error.details[0].message, null);
    }

    try {
      const response = await fetch(
        getUrl(`flight/book/${flightOrderBookingParams.flight_id}`),
        tiqwaConnect("POST", JSON.stringify(flightOrderBookingParams))
      );
      const data = await response.json();

      const { status } = response;
      console.log(status);
      if (status == 404) {
        return send400("flight not found", null);
      } else {
        const createInvoice = await fetch(
          getCBDCgql(),
          cbdcGqlConnect(
            "POST",
            invoiceContent(
              data.amount,
              data.reference,
              `Payment for flight with reference ${data.reference}`
            )
          )
        );
        let qrData = await createInvoice.json();
        console.log(qrData);

        let booking = new Booking();
        booking.inbound = data.inbound;
        booking.outbound = data.outbound;
        booking.guid = qrData.data.createInvoice.guid;
        booking.reference = data.reference;
        booking.passengers = data.passengers;
        booking.isPayed = false;

        await this.db.save(booking).then((bk: any) => console.log(bk));

        return genericResponse(status, data.message, {
          ...data,
          guid: qrData.data.createInvoice.guid,
        });
      }
    } catch (error: any) {
      return send400(error.message, null);
    }
  }
  async fetchAirports(keyword: string): Promise<ResponseModel> {
    try {
      console.log(getUrl(`airports?keyword=${keyword}`));
      const response = await fetch(
        getUrl(`airports?keyword=${keyword}`),
        tiqwaConnect("GET", {})
      );
      const { status } = response;
      const data = await response.json();
      return genericResponse(status, data.message, data);
    } catch (error: any) {
      return send400(error.message, null);
    }
  }
}
