import dotenv from "dotenv";

dotenv.config();

const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);



export async function sendEmail(to:string,body:string) {
  try {
    await sendGridMail.send({
      to: to,
      from: 'no_reply@cbn.gov.ng',
      subject: 'Flight Ticket Issued Project Ajala',
      text: body,
      html: `<strong>${body}</strong>`,
    });
    console.log('Test email sent successfully');
  } catch (error: any) {
    console.error('Error sending test email');
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

