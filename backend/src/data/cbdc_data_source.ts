import dotenv from "dotenv";

dotenv.config();

const { CBDC_ACCESS_KEY } = process.env;

export function getCBDCgql(): string {
  return `https://app.enaira.com/ecommerce/graphql`;
}

export function cbdcGqlConnect(method: string, body: Object): any {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      access_key: CBDC_ACCESS_KEY,
    },
    body: method == "GET" ? null : body,
  };
}
