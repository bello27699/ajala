import { CreateApplicationUseCase } from "@/domain/interfaces/use-cases/rfa/create_application_usecase";
import { RFARequestParams } from "@/domain/models/tour/rfa/rfa_request_params";
import express, { Express, Request, Response } from "express";

import { csrfProtection } from "../../server";

export default function RFARouter(
  createApplicationUseCase: CreateApplicationUseCase
) {
  const router = express.Router();

  router.post(
    "/submitApplication",
   
    async (req: Request<{}, {}, {}>, res: Response) => {
      let result = await createApplicationUseCase.execute(req.body as RFARequestParams);
      res.status(result.status_code).send(result);
    }
  );

  return router;
}
