import api from "./api";

import { ActivityModel } from "../models";

interface ActivityCreateData {
  name: string;
  description: string;
  deadline: Date | undefined;
  idClass: string;
}

export const getForTeacher = async (id: string): Promise<ActivityModel[]> => {
  const response = await api.get(`/activity/${id}/by-class/for-teacher`);
  return response.data;
};

export const getForStudent = async (id: string): Promise<ActivityModel[]> => {
  const response = await api.get(`/activity/${id}/by-class/for-student`);
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
