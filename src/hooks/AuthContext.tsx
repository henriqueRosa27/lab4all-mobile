import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  ReactNode
} from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../services/api";
import { User } from "../models";

interface AuthState {
  token: string;
  user: User;
}

interface SyncData {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SyncData): Promise<void>;
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
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ user, token }) => {
    try {
      setLoading(true);
      await AsyncStorage.multiSet([
        ["@lab4all:token", token],
        ["@lab4all:user", JSON.stringify(user)]
      ]);

      setData({ token, user });
    } catch (e) {
      Alert.alert("Erro inesperado");
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(["@lab4all:token", "@lab4all:user"]);

    delete api.defaults.headers.authorization;

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        signIn,
        signOut
      }}>
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
