export interface Client {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  notes?: string;
  created_at: Date;
  address?: string;
}

export interface CreateClientData {
  name: string;
  phone?: string;
  email?: string;
  notes?: string;
  address?: string;
}

export interface UpdateClientData {
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  address?: string;
}
