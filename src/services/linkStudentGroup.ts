import api from "./api";

interface LinkByCodeData {
  code: string;
}

interface LinkByEmailData {
  email: string;
  idClass: string;
}

export const linkByCode = async (
  data: LinkByCodeData
): Promise<{ message: string }> => {
  const response = await api.post("/student-class/by-code", data);
  return response.data;
};

export const linkByEmail = async ({
  email,
  idClass
}: LinkByEmailData): Promise<{ message: string }> => {
  const response = await api.post("/student-class/by-email", {
    email,
    id_class: idClass
  });
  return response.data;
};
