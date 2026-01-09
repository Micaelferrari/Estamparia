export interface Client {
    id : string;
    name : string;
    phone?: string;
    email?: string;
    notes?: string;
    created_at : Date;
    adress?: string
}