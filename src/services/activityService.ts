import api from "./api";

import { ActivityModel } from "../models";

export const get = async (id: string): Promise<ActivityModel[]> => {
  const response = await api.get(`/activity/${id}/by-class`);
  return response.data;
};
