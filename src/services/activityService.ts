import api from "./api";

import { ActivityModel } from "../models";

interface ActivityCreateData {
  name: string;
  description: string;
  deadline: Date | undefined;
  idClass: string;
}

export const get = async (id: string): Promise<ActivityModel[]> => {
  const response = await api.get(`/activity/${id}/by-class`);
  return response.data;
};

export const create = async ({
  name,
  description,
  deadline,
  idClass
}: ActivityCreateData): Promise<ActivityModel> => {
  const response = await api.post("/activity", {
    name,
    description,
    deadline,
    id_class: idClass
  });
  return response.data;
};
