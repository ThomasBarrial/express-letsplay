import { wildersDAO } from "../dao";
import { Wilder } from "../models";

// * Wilders CRUD, calling functions from DAO
export const wilderService = {
  readAll: async () => {
    return await wildersDAO.findAll();
  },
  readOne: async (id: string) => {
    return await wildersDAO.findWilder(id);
  },
  create: async (wilder: Wilder) => {
    return await wildersDAO.createWilder(wilder)
  },
  update: async (id: string, data: any) => {
    return await wildersDAO.updateWilder(id, data);
  },
  delete: async (id: string) => {
    return await wildersDAO.deleteWilder(id);
  }
}