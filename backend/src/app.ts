import dotenv from "dotenv";

import { AppDataSource } from "./data/pg_data_source";
import swaggerUi = require("swagger-ui-express");
import fs = require("fs");
import app from "./server";

import { UserRepositoryImpl } from "./domain/repositories/user/user_repository_impl";
import UserRouter from "./presentation/routers/user_router";

import AirportRouter from "./presentation/routers/airport_router";
import { FetchAirports } from "./domain/use-cases/airports/fetch_airports";
import { AirportRepositoryImpl } from "./domain/repositories/flight_module/airport_repository_impl";
import AirLineRouter from "./presentation/routers/airline_router";
import { FetchAirlines } from "./domain/use-cases/airlines/fetch_airlines";
import { ConfirmPrice } from "./domain/use-cases/flight/confirm_price";
import { AirlineRepositoryImpl } from "./domain/repositories/flight_module/airline_repository_impl";
import FlightRouter from "./presentation/routers/flight_router";
import { FetchFlightOffers } from "./domain/use-cases/flight/fetch_flight_offers";
import { FlightRepositoryImpl } from "./domain/repositories/flight_module/flight_repository_impl";
import { FlightOrderBooking } from "./domain/use-cases/airports/flight_order_booking";
import { FetchBookingDetails } from "./domain/use-cases/flight/fetch_booking_details";
import { ProcessBookingAndIssueTicket } from "./domain/use-cases/flight/process_booking_issue_ticket";
import { HandleWebHook } from "./domain/use-cases/flight/handle_web_hook";
import { Login } from "./domain/use-cases/users/login";
import { HandleLDAPRedirect } from "./domain/use-cases/users/handle_ldap_redirect";
import { FetchInvoiceWithGUID } from "./domain/use-cases/flight/fetch_invoice_with_guid";
import RFARouter from "./presentation/routers/rfa_router";
import { CreateApplication } from "./domain/use-cases/rfa/create_appication";
import { RFARepositoryImpl } from "./domain/repositories/request_for_approval/rfa_repository_impl";

dotenv.config();

const port = process.env.PORT;
let swaggerFile: any = process.cwd() + "/src/presentation/swagger/swagger.json";
let swaggerData: any = fs.readFileSync(swaggerFile, "utf8");
let customCss: any = fs.readFileSync(
  process.cwd() + "/src/presentation/swagger/style.css",
  "utf8"
);
let swaggerDocument = JSON.parse(swaggerData);
const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } =
  process.env;
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});

AppDataSource.initialize()
  .then((db) => {
    console.log("Connected to Postgres DB");

    const userMiddleWare = UserRouter(
      new Login(new UserRepositoryImpl(db)),
      new HandleLDAPRedirect(new UserRepositoryImpl(db))
    );

    const airportMiddleWare = AirportRouter(
      new FetchAirports(new AirportRepositoryImpl(db)),
      new FlightOrderBooking(new AirportRepositoryImpl(db)),
    );

    const airlineMiddleWare = AirLineRouter(
      new FetchAirlines(new AirlineRepositoryImpl())
    );

    const rfaMiddleWare = RFARouter(
      new CreateApplication(new RFARepositoryImpl(db))
    )
    const flightMiddleWare = FlightRouter(
      new FetchFlightOffers(new FlightRepositoryImpl(db)),
      new ConfirmPrice(new FlightRepositoryImpl(db)),
      new FetchBookingDetails(new FlightRepositoryImpl(db)),
      new ProcessBookingAndIssueTicket(new FlightRepositoryImpl(db)),
      new HandleWebHook(new FlightRepositoryImpl(db)),
      new FetchInvoiceWithGUID(new FlightRepositoryImpl(db))
    );

    app.use(
      "/api-doc",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, undefined, undefined, customCss)
    );
    app.use("/api/v1/ad", userMiddleWare);
    app.use("/api/v1/airports", airportMiddleWare);
    app.use("/api/v1/airlines", airlineMiddleWare);
    app.use("/api/v1/flights", flightMiddleWare);
    app.use("/api/v1/rfa", rfaMiddleWare);

  

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => console.log(error));
