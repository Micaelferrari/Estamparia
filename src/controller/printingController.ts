import { Printing } from './../models/printingModel';
import { UpdatePrintingData } from '../models/printingModel';
import { Request, Response } from "express";
import * as printingService from "../service/printingService";

export const get = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (name) {
      const data = await printingService.getByName(name as string);
      return res.status(200).json(data);
    }

    const data = await printingService.getAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const printing = await printingService.getById(id);

    return res.status(200).json(printing);
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name, phone, address } = req.body;

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

    if (address && typeof address !== "string") {
      return res.status(400).json({ message: "address deve ser string" });
    }

    const data = await printingService.create(
      name.trim(),
      phone.trim(),
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
    const { name, phone, address } = req.body;
     const data : UpdatePrintingData = {
      name,
      phone,
      address,
      created_at: new Date()
    }

  if (!id) {
        return res.status(400).json({
          message: "ID é obrigatório para atualizar",
        });
      }
    if (!name && !phone && !address) {
      return res.status(400).json({
        message: "Informe ao menos um campo para atualização",
      });
    }

 const printing = await printingService.update(id, data);

    return res.status(200).json(printing);
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

export const deletePrinting = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "ID é obrigatório para deletar",
      });
    }

    const printingDeleted = await printingService.deletePrinting(id);
    return res.status(200).json(printingDeleted);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};
