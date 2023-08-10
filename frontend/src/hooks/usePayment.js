// // import { useEffect } from "react";
// import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

// export default function usePayment(amount,reference,verifyPaymentCallback){
//     const flutterwaveConfig = {
//         public_key: "FLWPUBK_TEST-dbdd104b37db67388bcf386604b9aa91-X",
//           // tx_ref: ref,
//           tx_ref: reference,
//           amount: `${amount + (amount * 0.075)}`,
//           currency: "NGN",
//           payment_options: "card, banktransfer, ussd",
//           customer: {
//             email: email.toString(),
//             phone_number: phone.toString(),
//             name: `${firstName} ${lastName}`,
//           },
//           customizations: {
//             title: "Ajala",
//             description: "Flights Payment",
//             // logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
//           },
//           callback: (paymentResponse) => {
//             // Send AJAX verification request to backend
//             console.log('Payment response:',paymentResponse);
//             // handleNext();
//             closePaymentModal()
//             verifyPaymentCallback(ref, bookingRef);
//           },
//           onClose: ()=>{
//             console.log("Payment window closed");
//             return false;
//           }
//       }
//       useFlutterwave(flutterwaveConfig);
// }