import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext
} from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "./AuthContext";
import { create } from "../services/userService";

interface signUpCredentials {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface SignUpContextData {
  loading: boolean;
  singUp(credentials: signUpCredentials): Promise<void>;
}

interface SingUpProviderProps {
  children: ReactNode;
}

const SignUpContext = createContext<SignUpContextData>({} as SignUpContextData);

const SignUpProvider: FC<SingUpProviderProps> = ({
  children
}: SingUpProviderProps) => {
  const [loading, setLoading] = useState(false);
  const { signIn: signInAuthConext } = useAuth();
  const navigation = useNavigation();

  const singUp = useCallback(async ({ name, surname, email, password }) => {
    try {
      setLoading(true);
      const { user, token } = await create({ name, surname, email, password });
      await signInAuthConext({ user, token });
      navigation.navigate("ListGroupPage");
    } catch (e) {
      if (e.response.status == 500) {
        Alert.alert(
          "Erro Servidor",
          "Ocorreu um erro ao conectar com o servidor. Por favor, tente novamente mais tarde!"
        );
      } else {
        if (e.response?.data?.message == "Email address already used") {
          Alert.alert(
            "E-mail já cadastrado",
            "Esse e-mail já está cadastrado. Por favor insira outro!"
          );
        } else if (e.response?.status === 400) {
          Alert.alert(
            "Erro ao enviar dados",
            "Favor, valide seus dados e tente novamente!"
          );
        } else {
          Alert.alert("Erro inesperado");
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <SignUpContext.Provider value={{ loading, singUp }}>
      {children}
    </SignUpContext.Provider>
  );
};

export function useSignUp(): SignUpContextData {
  const context = useContext(SignUpContext);

  if (!context) {
    throw new Error("useAuth must be used within a SingUpProviderProps");
  }

  return context;
}

export default SignUpProvider;
