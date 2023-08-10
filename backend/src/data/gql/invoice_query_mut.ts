export function invoiceContent(amount: any, paymentId: any, note: string): any {
  return JSON.stringify({
    query:
    `mutation ($input: CreateInvoiceInput!) {\n\tcreateInvoice(input: $input) {\n\t\tpaymentId\n\t\tcallbackUrl\n\t\tamount\n\t\tnote\n\t\tstate\n\t\tguid\n\t\tmessage\n\t}\n}\n`,
    variables: {
      input: {
        amount: amount.toFixed(2).toString(),
        paymentId: paymentId,
        callbackUrl: "https://cbnlnxprojectajalabackenddevtest.azurewebsites.net/api/v1/flights/events",
        note: note,
      },
    }
  });
}
