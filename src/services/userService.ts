import api from "./api";

interface SignInData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface SignInResponse {
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
  };
  token: string;
}

export const signIn = async (data: SignInData): Promise<SignInResponse> => {
  const response = await api.post("/user", data);
  return response.data;
};
