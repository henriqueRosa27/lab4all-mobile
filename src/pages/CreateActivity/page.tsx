import React, { FC, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns";

import styles from "./styles";
import { TextInputComponent, ButtonComponent } from "../../components";
import { ModalDateTimePicker } from "./components";
import { useCreateActivity } from "../../hooks/CreateActivityContext";

type FormData = {
  name: string;
  description: string;
  deadline: Date | undefined;
};

interface DetailsGroupRouteParams {
  idClass: string;
}

const rules = {
  name: {
    required: "Campo obrigatório",
    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
    maxLength: { value: 50, message: "Máximo de 50 caracteres" }
  },
  description: {
    required: "Campo obrigatório",
    minLength: { value: 4, message: "Mínimo de 4 caracteres" },
    maxLength: { value: 500, message: "Máximo de 500 caracteres" }
  }
};

const CreateActivity: FC = () => {
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [dateIsSelected, setDateIsSelected] = useState(false);
  const navigation = useNavigation();
  const { create, loading } = useCreateActivity();
  const route = useRoute();
  const params = route.params as DetailsGroupRouteParams;

  const {
    errors,
    handleSubmit,
    control,
    formState,
    setValue
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: undefined,
      description: undefined,
      deadline: undefined
    }
  });

  const _callData = async ({ name, description }: FormData) => {
    create({
      name,
      description,
      deadline: dateIsSelected ? date : undefined,
      idClass: params.idClass
    });
  };

  const setDateTest = (date: Date) => {
    setValue("deadline", format(date, "  dd/MM/yyyy HH:mm"));
    setDateIsSelected(true);
    setDate(date);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}>
      <View style={styles.containerCenter}>
        <View style={styles.circle}>
          <MaterialIcons name="assignment" size={60} color="#4d6e92" />
        </View>

        <Text style={[styles.title]}>Criar nova atividade</Text>
        <Text style={[styles.description, styles.limitWidth]}>
          Preencha corretamente os campos abaixo e clique em
          &quot;Concluir&quot;
        </Text>
      </View>
      <TextInputComponent
        label={"Nome *"}
        control={control}
        name={"name"}
        placeholder={"Insira nome da atividade"}
        autoCompleteType="name"
        editable={!loading}
        rules={rules.name}
        error={errors?.name?.message}
      />
      <TextInputComponent
        label={"Descrição *"}
        control={control}
        name={"description"}
        placeholder={"Insira nome da atividade"}
        autoCompleteType="name"
        editable={!loading}
        rules={rules.description}
        error={errors?.description?.message}
      />
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View>
          <View pointerEvents="none">
            <TextInputComponent
              label={"Data de entrega"}
              control={control}
              name={"deadline"}
              placeholder={"Selecione a data de entrega"}
              autoCompleteType="name"
              editable={false}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ButtonComponent
        onPress={handleSubmit(_callData)}
        enabled={formState.isValid}>
        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text style={styles.buttonText}>Concluir</Text>
        )}
      </ButtonComponent>
      <ButtonComponent
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </ButtonComponent>
      <ModalDateTimePicker
        visible={modalVisible}
        date={date}
        setDate={setDateTest}
        closeModal={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

export default CreateActivity;
