import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  ReactNode
} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../services/api";
import { signIn as signInService } from "../services/sessionService";
import { Alert } from "react-native";

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface signInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: signInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children
}: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        "@lab4all:token",
        "@lab4all:user"
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    try {
      setLoading(true);
      const { token, user } = await signInService({ email, password });


      await AsyncStorage.multiSet([
        ["@lab4all:token", token],
        ["@lab4all:user", JSON.stringify(user)]
      ]);

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
    } catch (e) {
      if (e.response.status == 401) {
        Alert.alert("Erro dados", "E-mail e/ou senha incorretos!");
      } else if (e.response.status == 404) {
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

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(["@lab4all:token", "@lab4all:user"]);

    api.defaults.headers.authorization = null;

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

export default AuthContext;
