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

import { create as createGroupService } from "../services/groupService";

interface CreateGroupData {
  name: string;
  description: string;
}

interface CreateGroupContextData {
  loading: boolean;
  create(data: CreateGroupData): Promise<void>;
}

interface CreateGroupProviderProps {
  children: ReactNode;
}

const CreateGroupContext = createContext<CreateGroupContextData>(
  {} as CreateGroupContextData
);

const CreateGroupProvider: FC<CreateGroupProviderProps> = ({
  children
}: CreateGroupProviderProps) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const create = useCallback(async ({ name, description }) => {
    try {
      setLoading(true);
      await createGroupService({ name, description });

      navigation.navigate("ListGroupPage");
    } catch (e) {
      if (e.response.status == 500) {
        Alert.alert(
          "Erro Servidor",
          "Ocorreu um erro ao conectar com o servidor. Por favor, tente novamente mais tarde!"
        );
      } else {
        if (e.response?.status === 400) {
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
    <CreateGroupContext.Provider value={{ loading, create }}>
      {children}
    </CreateGroupContext.Provider>
  );
};

export function useCreateGroup(): CreateGroupContextData {
  const context = useContext(CreateGroupContext);

  if (!context) {
    throw new Error("useAuth must be used within a SingUpProviderProps");
  }

  return context;
}

export default CreateGroupProvider;
