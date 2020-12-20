import api from "./api";

interface SignInData {
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
