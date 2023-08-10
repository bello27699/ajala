import { Cabin } from "./cabin";

export interface FlightOfferQueryParams {
    adults: number;
    cabin:Cabin;
    departure_Date:Date;
    destination:string;
    origin:string;
    children:number;
    infants:number;
    return_date:Date
}