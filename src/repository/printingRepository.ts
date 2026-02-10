import { db } from "../database/connection";
import { randomUUID } from "crypto";
import { UpdatePrintingData, Printing, CreatePrintingData } from "../models/printingModel";

export const create = async (data: CreatePrintingData): Promise<Printing> => {
  const id = randomUUID();
  const printing : Printing = {
    id,
    name: data.name,
    phone: data.phone,
    address: data.address,
    created_at: new Date(),
  };

  await db("printing").insert(printing);

  return printing;
};

export const getAll = async (): Promise<Printing[]> => {
  const printing = await db<Printing>("printing")
    .select("*")
    .orderBy("created_at", "desc");

  return printing;
};

export const findByName = async (name: string): Promise<Printing[]> => {
  const printing = await db<Printing>("printing")
    .select("*")
    .where("name", "like", `%${name}%`)
    .orderBy("created_at", "desc");

  return printing;
};

export const findById = async (id: string) => {
  const printing = await db<Printing>("printing").select("*").where("id", id);

  return printing;
};

export const deletePrinting = async (id: string): Promise<Printing[]> => {
  const deleted = await db("printing").where({ id }).delete().returning("*");

  return deleted[0];
};

export const update = async (
  id: string,
  data: UpdatePrintingData
): Promise<Printing> => {
  const updated = await db("printing")
    .where({ id })
    .update(data)
    .returning("*");

  return updated[0];
};
