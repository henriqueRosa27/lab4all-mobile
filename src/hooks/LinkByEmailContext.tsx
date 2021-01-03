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

import { linkByEmail } from "../services/linkStudentGroup";

interface LinkByEmailData {
  email: string;
  idClass: string;
}

interface LinkByEmailContextData {
  loading: boolean;
  link(data: LinkByEmailData): Promise<void>;
}

interface LinkByEmailProviderProps {
  children: ReactNode;
}

const LinkByEmailContext = createContext<LinkByEmailContextData>(
  {} as LinkByEmailContextData
);

const LinkByEmailProvider: FC<LinkByEmailProviderProps> = ({
  children
}: LinkByEmailProviderProps) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const link = useCallback(async ({ email, idClass  }) => {
    try {
      setLoading(true);
      await linkByEmail({ email, idClass });

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Sucesso",
        text2: "Aluno vinculado com sucesso"
      });

      navigation.goBack();
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
    <LinkByEmailContext.Provider value={{ loading, link }}>
      {children}
    </LinkByEmailContext.Provider>
  );
};

export function useLinkByEmail(): LinkByEmailContextData {
  const context = useContext(LinkByEmailContext);

  if (!context) {
    throw new Error("useAuth must be used within a SingUpProviderProps");
  }

  return context;
}

export default LinkByEmailProvider;
