import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode
} from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import api from "../services/api";
import { signIn as signInService } from "../services/sessionService";
import { useAuth } from "./AuthContext";

interface SignInData {
  email: string;
  password: string;
}

interface SignInContextData {
  loading: boolean;
  signIn(credentials: SignInData): Promise<void>;
}

interface SignInProviderProps {
  children: ReactNode;
}

const SignInContext = createContext<SignInContextData>({} as SignInContextData);

export const SignInProvider: React.FC<SignInProviderProps> = ({
  children
}: SignInProviderProps) => {
  const [loading, setLoading] = useState(false);
  const { signIn: signInAuthConext } = useAuth();
  const navigation = useNavigation();

  const signIn = useCallback(async ({ email, password }) => {
    try {
      setLoading(true);

      const { user, token } = await signInService({ email, password });
      await signInAuthConext({ user, token });


      api.defaults.headers.authorization = `Bearer ${token}`;

      navigation.navigate("ListGroupPage");
    } catch (e) {
      if (e.response?.status == 401) {
        Alert.alert("Erro dados", "E-mail e/ou senha incorretos!");
      } else if (e.response?.status == 404) {
        Alert.alert(
          "Erro ao enviar dados",
          "Favor, valide seus dados e tente novamente!"
        );
      } else {
        Alert.alert("Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SignInContext.Provider
      value={{
        loading,
        signIn
      }}>
      {children}
    </SignInContext.Provider>
  );
};

export function useSignIn(): SignInContextData {
  const context = useContext(SignInContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

export default SignInProvider;
