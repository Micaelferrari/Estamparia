import { db } from "../database/connection";
import { randomUUID } from "crypto";
import { UpdateClientData, Client,  CreateClientData } from "../models/clientModel";

export const create = async (data: CreateClientData): Promise<Client> => {
  const id = randomUUID();
  const client: Client = {
    id,
    name: data.name,
    phone: data.phone,
    email: data.email,
    notes: data.notes,
    address: data.address,
    created_at: new Date(),
  };

  await db("clients").insert(client);

  return client;
};

export const getAll = async (): Promise<Client[]> => {
  const clients = await db<Client>("clients")
    .select("*")
    .orderBy("created_at", "desc");

  return clients;
};

export const findByName = async (name: string): Promise<Client[]> => {
  const clients = await db<Client>("clients")
    .select("*")
    .where("name", "like", `%${name}%`)
    .orderBy("created_at", "desc");

  return clients;
};

export const findById = async (id: string) => {
  const client = await db<Client>("clients").select("*").where("id", id);

  return client;
};

export const deleteClient = async (id: string): Promise<Client[]> => {
  const deleted = await db("clients").where({ id }).delete().returning("*");

  return deleted[0];
};

export const update = async (
  id: string,
  data: UpdateClientData
): Promise<Client> => {
  const updated = await db("clients")
    .where({ id })
    .update(data)
    .returning("*");

  return updated[0];
};
