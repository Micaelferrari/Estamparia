import { Printing, UpdatePrintingData } from "./../models/printingModel";
import * as PrintingRepository from "../repository/printingRepository";

export const create = async (
  name: string,
  phone: string,
  address: string
) => {
  const dadosPrinting = {
    name,
    phone,
    address,
    created_at: new Date()
  };

    if (name.length === 0) {
    throw new Error('Nome inválido');
  }

  if (phone.length === 0) {
    throw new Error('Telefone inválido');
  }

  const newPrinting = await PrintingRepository.create(dadosPrinting);

  return newPrinting;
};

export const getAll = async () => {
  const printing = await PrintingRepository.getAll();
 
  
  return printing;
};

export const getByName = async (name : string) => {

  if (name.length === 0) {
  throw new Error('Nome não pode ser vazio');
}

  const printing = await PrintingRepository.findByName(name);
 
 if (!printing) {
  throw new Error('Estamparia não encontrado');
}
  return printing;
};

export const getById = async (id : string) => {

  if (id.length === 0) {
  throw new Error('Id não pode ser vazio');
}

  const printing = await PrintingRepository.findById(id);
 
 if (!printing) {
  throw new Error('Estamparia não encontrado');
}
  return printing;
};

export const update = async (id : string, data : UpdatePrintingData ) => {
   if (!id || id.trim().length === 0) {
    throw new Error("Id inválido");
  }

  if (!data || Object.keys(data).length === 0) {
    throw new Error("Informe ao menos um campo para atualização");
  }

  const printingExists = await PrintingRepository.findById(id);

  if (!printingExists) {
    throw new Error("Estamparia não encontrado");
  }

  const updatedPrinting = await PrintingRepository.update(id, data);

  return updatedPrinting;
};


export const deletePrinting = async(id : string) => {
  const printing = await PrintingRepository.findById(id);

  if (!printing) {
    throw new Error('Estamparia não encontrado');
  }

  const printingDeleted = await PrintingRepository.deletePrinting(id);

  return printingDeleted
};

