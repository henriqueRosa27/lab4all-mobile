import React, { FC } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import { TextInputComponent, ButtonComponent } from "../../components";
import { useLinkByCode } from "../../hooks/LinkByCodeContext";

type FormData = {
  code: string;
};

const LinkByCode: FC = () => {
  const navigation = useNavigation();
  const { link, loading } = useLinkByCode();

  const { errors, handleSubmit, control, formState } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      code: undefined
    }
  });

  const _callData = async (data: FormData) => {
    link(data);
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
          Preencha corretamente o código da turma e clique em
          &quot;Concluir&quot;
        </Text>
      </View>
      <TextInputComponent
        label={"Código *"}
        control={control}
        name={"code"}
        rules={{
          required: "Campo obrigatório",
          minLength: { value: 3, message: "Mínimo de 3 caracteres" },
          maxLength: { value: 10, message: "Máximo de 10 caracteres" }
        }}
        placeholder={"Insira o código da turma"}
        autoCompleteType="name"
        editable={!loading}
        error={errors?.code?.message}
        isLowerCase={true}
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

export default LinkByCode;
