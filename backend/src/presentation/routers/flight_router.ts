import express, { Express, Request, Response } from "express";
import { FetchFlightOffersUseCase } from "../../domain/interfaces/use-cases/flight/fetch_flight_offers_usecase";
import { FlightOrderBookingUseCase } from "../../domain/interfaces/use-cases/airport/flight_order_booking_usecase";
import { ConfirmPriceUseCase } from "../../domain/interfaces/use-cases/flight/confirm_price_usecase";
import { FlightOfferQueryParams } from "../../domain/models/types/flight_offer";
import { FetchBookingDetailsUseCase } from "../../domain/interfaces/use-cases/flight/fetch_booking_details_usecase";
import { ProcessBookingAndIssueTicketUseCase } from "../../domain/interfaces/use-cases/flight/process_booking_and_issue_ticket_usecase";
import { HandleWebHookUseCase } from "../../domain/interfaces/use-cases/flight/handle_webhook_usecase";
import { FetchInvoiceWithGuidUsecase } from "../../domain/interfaces/use-cases/flight/fetch_invoice_with_guid_usecase";
import { csrfProtection } from "../../server";



export default function FlightRouter(
  fetchFlightOffersUseCase: FetchFlightOffersUseCase,
  confirmPriceUseCase: ConfirmPriceUseCase,
  fetchBookingDetailsUseCase: FetchBookingDetailsUseCase,
  processBookingAndIssueTicketUseCase: ProcessBookingAndIssueTicketUseCase,
  handleWebHookUseCase: HandleWebHookUseCase,
  fetchInvoiceWithGuidUsecase:FetchInvoiceWithGuidUsecase
) {
  const router = express.Router();


  router.get("/search", async (req: Request<{}, {}, {}, FlightOfferQueryParams>, res: Response) => {
     const { query } = req;
     let result = await fetchFlightOffersUseCase.execute(query);
     res.status(result.status_code).send(result)

  });

  router.get("/booking_details/:booking_reference", async (req: Request, res: Response) => {
    let result = await fetchBookingDetailsUseCase.execute(req.params.booking_reference);
    res.status(result.status_code).send(result)

 });

  router.get("/confirm_price/:flight_id", async (req: Request, res: Response) => {
    let result = await confirmPriceUseCase.execute(req.params.flight_id);
    res.status(result.status_code).send(result)

 });

;

 router.get("/pay/:reference", async (req: Request, res: Response) => {
  let result = await processBookingAndIssueTicketUseCase.execute(req.params.reference);
  res.status(result.status_code).send(result)

});

router.post("/events", async (req: Request, res: Response) => {
  let result = handleWebHookUseCase.execute(req.body);
  res.status(200).send({"message":"event received"})

}) 

router.get("/invoice/:guid",async (req: Request, res: Response) => {
  let result = await fetchInvoiceWithGuidUsecase.execute(req.params.guid);
  res.status(result.status_code).send(result)

}) 

  return router;
}
