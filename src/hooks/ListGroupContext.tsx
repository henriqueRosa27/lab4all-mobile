import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext
} from "react";
import { Alert } from "react-native";

import { useAuth } from "./AuthContext";
import { get } from "../services/groupService";
import { GroupModel } from "../models";

interface ListGroupContextData {
  loading: boolean;
  data: GroupModel[];
  loadData(): Promise<void>;
}

interface ListGroupContextProps {
  children: ReactNode;
}

const ListGroupContext = createContext<ListGroupContextData>(
  {} as ListGroupContextData
);

const ListGroupProvider: FC<ListGroupContextProps> = ({
  children
}: ListGroupContextProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GroupModel[]>([]);
  const { signOut } = useAuth();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const groupData = await get();
      setData(groupData);
    } catch (e) {
      if (e.response.status === 401) {
        signOut();
      } else {
        Alert.alert(
          "Erro Servidor",
          "Ocorreu um erro ao conectar com o servidor. Por favor, tente novamente mais tarde!"
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <ListGroupContext.Provider value={{ loading, loadData, data }}>
      {children}
    </ListGroupContext.Provider>
  );
};

export function useListGroup(): ListGroupContextData {
  const context = useContext(ListGroupContext);

  if (!context) {
    throw new Error("useAuth must be used within a SingUpProviderProps");
  }

  return context;
}

export default ListGroupProvider;
