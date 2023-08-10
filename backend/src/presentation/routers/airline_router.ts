import express, { Express, Request, Response } from "express";
import { FetchAirlinesUseCase } from "../../domain/interfaces/use-cases/airlines/fetch_airlines_usecase";

export default function AirLineRouter(
  fetchAirLinesUseCase: FetchAirlinesUseCase
) {
  const router = express.Router();

  router.get("/",async (req: Request, res: Response) => {
    let result = await fetchAirLinesUseCase.execute();
    res.status(result.status_code).send(result);
  });

  return router;
}
