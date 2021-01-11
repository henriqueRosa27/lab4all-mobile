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

import {
  create as answerActivityService,
  getByActivity
} from "../services/answerActivityService";
import { AnswerActivityModel } from "../models";

interface AnswerActivityData {
  note: string;
  report: string;
  idActivity: string;
  image: string;
}

interface AnswerActivityContextData {
  loading: boolean;
  loadingGet: boolean;
  data: AnswerActivityModel | null;
  answer(data: AnswerActivityData): Promise<void>;
  get(id: string): Promise<void>;
}

interface AnswerActivityProviderProps {
  children: ReactNode;
}

const CreateActivityContext = createContext<AnswerActivityContextData>(
  {} as AnswerActivityContextData
);

const AnswerActivityProvider: FC<AnswerActivityProviderProps> = ({
  children
}: AnswerActivityProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnswerActivityModel | null>(null);
  const [loadingGet, setLoadingGet] = useState(false);
  const navigation = useNavigation();

  const answer = useCallback(async ({ note, report, idActivity, image }) => {
    try {
      setLoading(true);

      const dataImage = { uri: image, type: "image/jpg", name: "image.jpg" };

      const formData = new FormData();
      formData.append("note", note);
      formData.append("report", report);
      formData.append("id_activity", idActivity);
      formData.append("image", dataImage);
      await answerActivityService(formData);

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Sucesso",
        text2: "Resposta de atividade enviada com sucesso"
      });

      navigation.navigate("DetailsGroupPage");
    } catch (e) {
      console.log(e.response.data);
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

  const get = useCallback(async id => {
    try {
      setLoadingGet(true);
      const answerData = await getByActivity(id);
      answerData.image = "https://to-be-defined.herokuapp.com/files/" + answerData.image;
      setData(answerData);
    } catch (e) {
      console.log(e.response);
      Alert.alert(
        "Erro Servidor",
        "Ocorreu um erro ao conectar com o servidor. Por favor, tente novamente mais tarde!"
      );
    } finally {
      setLoadingGet(false);
    }
  }, []);
  return (
    <CreateActivityContext.Provider
      value={{ loading, loadingGet, data, answer, get }}>
      {children}
    </CreateActivityContext.Provider>
  );
};

export function useAnswerActivity(): AnswerActivityContextData {
  const context = useContext(CreateActivityContext);

  if (!context) {
    throw new Error("useAuth must be used within a SingUpProviderProps");
  }

  return context;
}

export default AnswerActivityProvider;
