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

interface CLinkByCodeContextData {
  loading: boolean;
  link(data: LinkByCodeData): Promise<void>;
}

interface LinkByCodeProviderProps {
  children: ReactNode;
}

const CreateGroupContext = createContext<CLinkByCodeContextData>(
  {} as CLinkByCodeContextData
);

const CreateGroupProvider: FC<LinkByCodeProviderProps> = ({
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
    <CreateGroupContext.Provider value={{ loading, link }}>
      {children}
    </CreateGroupContext.Provider>
  );
};

export function useLinkByCode(): CLinkByCodeContextData {
  const context = useContext(CreateGroupContext);

  if (!context) {
    throw new Error("useAuth must be used within a SingUpProviderProps");
  }

  return context;
}

export default CreateGroupProvider;
