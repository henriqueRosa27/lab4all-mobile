import api from "./api";

interface CreateGroupData {
  code: string;
}

export const linkByCode = async (
  data: CreateGroupData
): Promise<{ message: string }> => {
  const response = await api.post("/student-class/by-code", data);
  return response.data;
};
