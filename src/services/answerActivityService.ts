import api from "./api";

import { AnswerActivityModel } from "../models";

export const create = async (data: FormData): Promise<AnswerActivityModel> => {
  const response = await api.post("/activity-delivery", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
};

export const getByActivity = async (
  id: string
): Promise<AnswerActivityModel> => {
  const response = await api.get(`/activity-delivery/${id}/by-activity-user`);
  return response.data;
};
