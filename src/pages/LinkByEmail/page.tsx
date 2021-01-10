import React, { FC } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";

import styles from "./styles";
import { TextInputComponent, ButtonComponent } from "../../components";
import { useLinkByEmail } from "../../hooks/LinkByEmailContext";

type FormData = {
  email: string;
};

interface LinkByEmailRouteParams {
  idClass: string;
}

const LinkByEmail: FC = () => {
  const navigation = useNavigation();
  const { link, loading } = useLinkByEmail();
  const route = useRoute();

  const params = route.params as LinkByEmailRouteParams;

  const { errors, handleSubmit, control, formState } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      email: undefined
    }
  });

  const _callData = async ({ email }: FormData) => {
    link({ email, idClass: params.idClass });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}>
      <View style={styles.containerCenter}>
        <View style={styles.circle}>
          <Ionicons name="md-person-add" size={60} color="#4d6e92" />
        </View>

        <Text style={[styles.title]}>Se vincular a uma turma</Text>
        <Text style={[styles.description, styles.limitWidth]}>
          Preencha corretamente o e-mail do aluno e clique em
          &quot;Concluir&quot;
        </Text>
      </View>
      <TextInputComponent
        label={"E-mail *"}
        control={control}
        name={"email"}
        rules={{
          required: "Campo obrigatório",
          maxLength: { value: 100, message: "Máximo de 100 caracteres" },
          pattern: {
            value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            message: "E-mail inválido"
          }
        }}
        placeholder={"Insira o e-mail do aluno"}
        autoCompleteType="name"
        editable={!loading}
        error={errors?.email?.message}
        autoCapitalize={"none"}
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

export default LinkByEmail;
