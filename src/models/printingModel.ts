export interface Printing {
  id: string;
  name: string;
  phone?: string;
  created_at: Date;
  address?: string;
}

export interface CreatePrintingData {
   name: string;
  phone?: string;
  created_at: Date;
  address?: string;
}

export interface UpdatePrintingData {
  name: string;
  phone?: string;
  created_at: Date;
  address?: string;
}
