import { ResponseModel } from "../../models/response.model";
import dotenv from "dotenv";
import { genericResponse, send200, send400 } from "../../../utils/helpers";
import { getUrl, tiqwaConnect } from "../../../data/tiqwa_source";
import { FlightRepository } from "../../interfaces/repositories/flight_repository";
import { FlightOfferQueryParams } from "../../models/types/flight_offer";
import { validateFlightOfferRequestParams } from "../../../utils/validator/flight_offers_validator";
import fetch from "node-fetch";
import { DataSource } from "typeorm";
import { Booking } from "../../models/booking.entity";
import { cbdcGqlConnect, getCBDCgql } from "../../../data/cbdc_data_source";

import { getInvoiceWithGUIDQry } from "../../../data/gql/get_invoice_qry";
import { TiqwaEvents } from "../../models/types/tiqwa_events";
import { sendEmail } from "../../../utils/helpers/email";

dotenv.config();

export class FlightRepositoryImpl implements FlightRepository {
  db: any;

  constructor(db: DataSource) {
    this.db = db.getRepository(Booking);
  }
  async getPaymentInvoiceWithGUID(guid: any): Promise<ResponseModel> {
    const getInvoice = await fetch(
      getCBDCgql(),
      cbdcGqlConnect("POST", getInvoiceWithGUIDQry(guid))
    );
    let invoiceData = await getInvoice.json();
    console.log("here is the invoice data");
    console.log(invoiceData);
    return send200("Successfully fetched invoice", invoiceData.data.getInvoice);
  }

  async handleWebHook(event: any): Promise<void> {
    // Receive and handle tqwa event  e.g ticket.issued , flight.booked
    console.log("Received event from tiqwa");
    console.log(event);
    if (event.event == TiqwaEvents.TICKET_ISSUED) {
      await sendEmail(
        event.data.passengers[0].email,
        `Thank you for booking with Ajala here are your booking details <br>PNR: ${event.data.pnr}\n <br>Amount paid: ${event.data.amount}\n <br>Reference: ${event.data.reference} <br>Ticket number: ${event.data.tickets[0].ticket_number} <br>From: ${event.data.outbound[0].airport_from} <br>To: ${event.data.outbound[0].airport_to} <br>Cabin Type: ${event.data.outbound[0].cabin_type}`
      );
    }
    console.log("Handle events to be implemented implemented");
  }

  async processBookingAndissueTicket(
    booking_reference: string
  ): Promise<ResponseModel> {
    try {
      const response = await fetch(
        getUrl(`flight/pay/${booking_reference}`),
        tiqwaConnect("POST", {})
      );
      const { status } = response;
      const data = await response.json();

      const flightDeets = await fetch(
        getUrl(`flight/${booking_reference}`),
        tiqwaConnect("GET", {})
      );

      const details = await flightDeets.json();

      if (status == 200) {
        return genericResponse(status, data.message, data);
      } else if (status == 403) {
        return genericResponse(status, data.message, data);
      } else {
        return genericResponse(status, data.message, data);
      }
    } catch (error: any) {
      return send400(error.message, null);
    }
  }

  async fetchBookingDetails(booking_reference: string): Promise<ResponseModel> {
    try {
      const response = await fetch(
        getUrl(`flight/${booking_reference}`),
        tiqwaConnect("GET", {})
      );
      const { status } = response;
      const data = await response.json();
      return genericResponse(status, data.message, data);
    } catch (error: any) {
      return send400(error.message, null);
    }
  }

  async confirmPrice(flight_id: string): Promise<ResponseModel> {
    try {
      const response = await fetch(
        getUrl(`flight/confirm_price/${flight_id}`),
        tiqwaConnect("GET", {})
      );
      const { status } = response;
      const data = await response.json();
      return genericResponse(status, data.message, data);
    } catch (error: any) {
      return send400(error.message, null);
    }
  }

  async fetchFlightOffers(
    flightOfferQueryParams: FlightOfferQueryParams
  ): Promise<ResponseModel> {
    console.log(flightOfferQueryParams);
    let isParamsValid = validateFlightOfferRequestParams(
      flightOfferQueryParams
    );
    console.log(isParamsValid.error);

    if (isParamsValid.error) {
      console.log(isParamsValid);
      return send400(isParamsValid.error.details[0].message, null);
    }

    try {
      const searchParams = new URLSearchParams();
      const params: any = flightOfferQueryParams;
      Object.keys(params).forEach((key) =>
        searchParams.append(key, params[key])
      );
      
      console.log(searchParams.toString());
      const response = await fetch(
        getUrl(`flight/search?${searchParams.toString()}`),
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
