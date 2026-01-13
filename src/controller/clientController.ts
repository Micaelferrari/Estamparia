import { UpdateClientData } from './../models/clientModel';
import { Request, Response } from "express";
import * as clientService from "../service/clientService";

export const get = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (name) {
      const data = await clientService.getByName(name as string);
      return res.status(200).json(data);
    }

    const data = await clientService.getAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const client = await clientService.getById(id);

    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, notes, address } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Body não pode ser vazio" });
    }

    if (!name || !phone) {
      return res.status(400).json({
        message: "Campos obrigatórios: nome e telefone",
      });
    }
    if (typeof name !== "string" || typeof phone !== "string") {
      return res.status(400).json({
        message: "name e phone devem ser strings",
      });
    }
    if (email && typeof email !== "string") {
      return res.status(400).json({ message: "email deve ser string" });
    }

    if (notes && typeof notes !== "string") {
      return res.status(400).json({ message: "notes deve ser string" });
    }

    if (address && typeof address !== "string") {
      return res.status(400).json({ message: "address deve ser string" });
    }

    const data = await clientService.create(
      name.trim(),
      phone.trim(),
      email,
      notes,
      address
    );

    return res.status(201).json(data);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id }= req.params;
    const { name, phone, email, notes, address } = req.body;
     const data : UpdateClientData = {
      name,
      phone,
      email,
      notes,
      address
    }

  if (!id) {
        return res.status(400).json({
          message: "ID é obrigatório para atualizar",
        });
      }
    if (!name && !phone && !email && !notes && !address) {
      return res.status(400).json({
        message: "Informe ao menos um campo para atualização",
      });
    }

 const client = await clientService.update(id, data);

    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "ID é obrigatório para deletar",
      });
    }

    const clientDeleted = await clientService.deleteClient(id);
    return res.status(200).json(clientDeleted);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};
