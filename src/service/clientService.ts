import { Client, UpdateClientData } from "./../models/clientModel";
import * as clientRepository from "../repository/clientRepository";

export const create = async (
  name: string,
  phone: string,
  email: string,
  notes: string,
  address: string
) => {
  const dadosClient = {
    name,
    phone,
    email,
    notes,
    address,
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

export const getById = async (id : string) => {

  if (id.length === 0) {
  throw new Error('Id não pode ser vazio');
}

  const clients = await clientRepository.findById(id);
 
 if (!clients) {
  throw new Error('Cliente não encontrado');
}
  return clients;
};

export const update = async (id : string, data : UpdateClientData ) => {
   if (!id || id.trim().length === 0) {
    throw new Error("Id inválido");
  }

  if (!data || Object.keys(data).length === 0) {
    throw new Error("Informe ao menos um campo para atualização");
  }

  const clientExists = await clientRepository.findById(id);

  if (!clientExists) {
    throw new Error("Cliente não encontrado");
  }

  const updatedClient = await clientRepository.update(id, data);

  return updatedClient;
};


export const deleteClient = async(id : string) => {
  const client = await clientRepository.findById(id);

  if (!client) {
    throw new Error('Cliente não encontrado');
  }

  const clientDeleted = await clientRepository.deleteClient(id);

  return clientDeleted
};

