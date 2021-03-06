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
import Toast from "react-native-toast-message";

import { linkByCode } from "../services/linkStudentGroup";

interface LinkByCodeData {
  code: string;
}

interface LinkByCodeContextData {
  loading: boolean;
  link(data: LinkByCodeData): Promise<void>;
}

interface LinkByCodeProviderProps {
  children: ReactNode;
}

const LinkByCodeContext = createContext<LinkByCodeContextData>(
  {} as LinkByCodeContextData
);

const LinkByCodeProvider: FC<LinkByCodeProviderProps> = ({
  children
}: LinkByCodeProviderProps) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const link = useCallback(async ({ code }) => {
    try {
      setLoading(true);
      await linkByCode({ code });

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Sucesso",
        text2: "Você foi vinculado com sucesso"
      });

      navigation.navigate("ListGroupPage");
    } catch (e) {
      if (e.response.status == 500) {
        Alert.alert(
          "Erro Servidor",
          "Ocorreu um erro ao conectar com o servidor. Por favor, tente novamente mais tarde!"
        );
      } else {
        if (
          e.response?.status === 404 &&
          e.response?.data?.message === "Class not found"
        ) {
          Alert.alert("Não existe classe com esse código");
        } else if (
          e.response?.status === 400 &&
          e.response?.data?.message === "User already linked"
        ) {
          Alert.alert("Usuário já vinculado a turma");
        } else {
          Alert.alert("Erro inesperado");
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <LinkByCodeContext.Provider value={{ loading, link }}>
      {children}
    </LinkByCodeContext.Provider>
  );
};

export function useLinkByCode(): LinkByCodeContextData {
  const context = useContext(LinkByCodeContext);

  if (!context) {
    throw new Error("useAuth must be used within a SingUpProviderProps");
  }

  return context;
}

export default LinkByCodeProvider;
