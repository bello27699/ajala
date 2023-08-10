import { send } from "process";

export interface ResponseModel {
  message: String;
  status_code: number;
  data: any;
}


export function sendResponse(message: string, status_code: number, data:any): ResponseModel {
  return {
    message,
    status_code:status_code,
    data
  };
}