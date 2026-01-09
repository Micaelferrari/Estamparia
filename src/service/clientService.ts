import { Client } from "./../models/clientModel";
import * as clientRepository from "../repository/clientRepository";

export const create = async (
  name: string,
  phone: string,
  email: string,
  notes: string,
  adress: string
) => {
  const dadosClient = {
    name,
    phone,
    email,
    notes,
    adress,
  };

    if (name.length === 0) {
    throw new Error('Nome inválido');
  }

  if (phone.length === 0) {
    throw new Error('Telefone inválido');
  }

  const newClient = await clientRepository.create(dadosClient);

  return newClient;
};

export const getAll = async () => {
  const clients = await clientRepository.getAll();
 
  
  return clients;
};

export const getByName = async (name : string) => {

  if (name.length === 0) {
  throw new Error('Nome não pode ser vazio');
}

  const clients = await clientRepository.findByName(name);
 
 if (!clients) {
  throw new Error('Cliente não encontrado');
}
  return clients;
};

export const deleteClient = async(id : string) =>{
  const client = await clientRepository.findById(id);

  if (!client) {
    throw new Error('Cliente não encontrado');
  }

  const clientDeleted = await clientRepository.deleteClient(id);

  return clientDeleted
};

