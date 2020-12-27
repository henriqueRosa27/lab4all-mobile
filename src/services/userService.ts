import api from "./api";

import { User } from "../models";
interface SignInData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface SignInResponse {
  user: User;
  token: string;
}

export const create = async (data: SignInData): Promise<SignInResponse> => {
  const response = await api.post("/user", data);
  return response.data;
};
