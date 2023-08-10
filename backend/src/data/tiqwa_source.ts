import dotenv from "dotenv";

dotenv.config();

const { TIQWA_API_KEY_SANDBOX } = process.env;

export function getUrl(path: string): string {
  return `https://prod.tiqwa.com/v1/${path}`;
  
}

const sandBoxKey =`Bearer ${TIQWA_API_KEY_SANDBOX}`
export function tiqwaConnect(method:string,body:Object): any {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization:sandBoxKey,
    },
    body:method=="GET"?null:body
  };
}
