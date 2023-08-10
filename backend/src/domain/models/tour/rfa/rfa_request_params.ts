export interface RFARequestParams {
  title: string;
  country: string;
  state: string;
  lga: string;
  venue: string;
  type: string;
  memo_url: string;
  description: string;
  participants: Record<string,string>[];
  start_date: Date;
  end_date: Date;
  note_to_approver: string;
}
