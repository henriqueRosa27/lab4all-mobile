import React, { FC } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import { TextInputComponent, ButtonComponent } from "../../components";
import { useCreateGroup } from "../../hooks/CreateGroupContext";

type FormData = {
  name: string;
  description: string;
};

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

const CreateGroup: FC = () => {
  const { create, loading } = useCreateGroup();
  const navigation = useNavigation();

  const { errors, handleSubmit, control, formState } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: undefined,
      description: undefined
    }
  });

  const _callData = async (data: FormData) => {
    await create(data);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}>
      <View style={styles.containerCenter}>
        <View style={styles.circle}>
          <MaterialIcons name="group-add" size={60} color="#4d6e92" />
        </View>
        <Text style={[styles.description, styles.limitWidth]}>
          Preencha corretamente os campos abaixo e clique em
          &quot;Concluir&quot;
        </Text>
      </View>
      <TextInputComponent
        label={"Nome *"}
        control={control}
        name={"name"}
        rules={rules.name}
        placeholder={"Insira nome da turma"}
        autoCompleteType="name"
        editable={!loading}
        error={errors?.name?.message}
      />
      <TextInputComponent
        label={"Descrição *"}
        control={control}
        name={"description"}
        rules={rules.description}
        placeholder={"Insira a descrição da turma"}
        autoCompleteType="name"
        editable={!loading}
        error={errors?.description?.message}
      />
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
    </ScrollView>
  );
};

export default CreateGroup;
