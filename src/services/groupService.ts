import api from "./api";

import { GroupModel } from "../models";

interface CreateGroupData {
  name: string;
  description: string;
}

export const get = async (): Promise<GroupModel[]> => {
  const response = await api.get("/class");
  return response.data;
};

export const create = async (data: CreateGroupData): Promise<GroupModel> => {
  const response = await api.post("/class", data);
  return response.data;
};

export const getById = async (id: string): Promise<GroupModel> => {
  const response = await api.get("/class/" + id);
  return response.data;
};
