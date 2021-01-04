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

import { create as createActivityService } from "../services/activityService";

interface CreateActivityData {
  name: string;
  description: string;
  deadline: Date | undefined;
  idClass: string;
}

interface CreateActivityContextData {
  loading: boolean;
  create(data: CreateActivityData): Promise<void>;
}

interface CreateActivityProviderProps {
  children: ReactNode;
}

const CreateActivityContext = createContext<CreateActivityContextData>(
  {} as CreateActivityContextData
);

const CreateActivityProvider: FC<CreateActivityProviderProps> = ({
  children
}: CreateActivityProviderProps) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const create = useCallback(
    async ({ name, description, deadline, idClass }) => {
      try {
        setLoading(true);
        await createActivityService({ name, description, deadline, idClass });

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Sucesso",
          text2: "Atividade cadastrado com sucesso"
        });

        navigation.navigate("DetailsGroupPage");
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
    },
    []
  );
  return (
    <CreateActivityContext.Provider value={{ loading, create }}>
      {children}
    </CreateActivityContext.Provider>
  );
};

export function useCreateActivity(): CreateActivityContextData {
  const context = useContext(CreateActivityContext);

  if (!context) {
    throw new Error("useAuth must be used within a SingUpProviderProps");
  }

  return context;
}

export default CreateActivityProvider;
