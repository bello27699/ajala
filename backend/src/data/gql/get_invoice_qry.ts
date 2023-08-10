export function getInvoiceWithGUIDQry(guid: string): any {
  return JSON.stringify({
    query: `query GetInvoice($guid: String, $paymentId: String){\n  getInvoice(guid: $guid, paymentId: $paymentId){\n    guid\n    paymentId\n    amount\n    state\n    note\n  }\n}\n`,
    operationName: "GetInvoice",
    variables: {
      guid: guid,
    },
  });
}
