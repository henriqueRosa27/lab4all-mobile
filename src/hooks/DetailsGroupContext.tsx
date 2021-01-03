import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext
} from "react";
import { Alert } from "react-native";

import { getById } from "../services/groupService";
import { get } from "../services/activityService";
import { GroupModel, ActivityModel } from "../models";

interface DetailsGroupContextData {
  loading: boolean;
  groupData: GroupModel;
  activitiesData: ActivityModel[];
  loadData(id: string): Promise<void>;
}

interface DetailsGroupContextProps {
  children: ReactNode;
}

const DetailsGroupContext = createContext<DetailsGroupContextData>(
  {} as DetailsGroupContextData
);

const DetailsGroupProvider: FC<DetailsGroupContextProps> = ({
  children
}: DetailsGroupContextProps) => {
  const [loading, setLoading] = useState(false);
  const [groupData, setGroupData] = useState<GroupModel>({} as GroupModel);
  const [activitiesData, setActivitiesData] = useState<ActivityModel[]>([]);

  const loadData = useCallback(async (id) => {
    try {
      setLoading(true);
      const group = await getById(id);
      const activities = await get(id);
      setGroupData(group);
      setActivitiesData(activities);
    } catch (e) {
      Alert.alert(
        "Erro Servidor",
        "Ocorreu um erro ao conectar com o servidor. Por favor, tente novamente mais tarde!"
      );
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <DetailsGroupContext.Provider value={{ loading, loadData, groupData, activitiesData }}>
      {children}
    </DetailsGroupContext.Provider>
  );
};

export function useDetailsGroup(): DetailsGroupContextData {
  const context = useContext(DetailsGroupContext);

  if (!context) {
    throw new Error("useAuth must be used within a SingUpProviderProps");
  }

  return context;
}

export default DetailsGroupProvider;
