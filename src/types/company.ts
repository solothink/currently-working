export type CompanyDetails = {
  id: number;
  company_name: string;
  brand_name: string | null;
  company_email: string;
  company_phone: string;
  gstin_no: string;
  pan_no: string;
  state: string;
  country: string;
  pin_code: number;
  approved: boolean;
};
