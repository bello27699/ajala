import express, { Express, Request, Response } from "express";
import { FetchAirPortsUseCase } from "../../domain/interfaces/use-cases/airport/fetch_airports_usecase";
import { FlightOrderBookingUseCase } from "../../domain/interfaces/use-cases/airport/flight_order_booking_usecase";
import { csrfProtection } from "../../server";



export default function AirportRouter(
  fetchAirportsUseCase: FetchAirPortsUseCase,
  flightOrderBookingUseCase: FlightOrderBookingUseCase
  
) {
  const router = express.Router();


  router.post("/book_flight",async (req: Request, res: Response) => {
    console.log("Sending post request")
    let result = await flightOrderBookingUseCase.execute(req.body);
    res.status(result.status_code).send(result)

 })
  
  router.get("/", async (req: Request, res: Response) => {
     let result = await fetchAirportsUseCase.execute("Nigeria");
     res.status(result.status_code).send(result)

  });



  return router;
}
