import React, { FC } from "react";
import { ScrollView, Image, Text, View, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { ButtonComponent, TextInputComponent } from "../../components";
import { useSignIn } from "../../hooks/SignInContext";
import Logo from "../../assets/logo.png";

import styles from "./styles";

type FormData = {
  email: string;
  password: string;
};

const rules = {
  email: {
    required: "Campo obrigatório",
    maxLength: { value: 50, message: "Máximo de 50 caracteres" },
    pattern: {
      value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      message: "E-mail inválido"
    }
  },
  password: {
    required: "Campo obrigatório",
    minLength: { value: 8, message: "Mínimo de 8 caracteres" },
    maxLength: { value: 16, message: "Máximo de 16 caracteres" }
  }
};

const SignIn: FC = () => {
  const navigation = useNavigation();

  const { signIn, loading } = useSignIn();

  const _calldata = async ({ email, password }: FormData) => {
    await signIn({ email, password });
  };

  const { errors, handleSubmit, control, formState } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { email: undefined, password: undefined }
  });

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 24 }}>
        <View style={styles.imageContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <TextInputComponent
          label={"E-mail *"}
          control={control}
          name={"email"}
          rules={rules.email}
          placeholder={"Insira seu e-mail"}
          autoCompleteType="email"
          keyboardType="email-address"
          editable={!loading}
          error={errors?.email?.message}
          autoCapitalize={"none"}
        />
        <TextInputComponent
          label={"Senha *"}
          control={control}
          name={"password"}
          rules={rules.password}
          placeholder={"Insira sua senha"}
          autoCompleteType="password"
          secureTextEntry={true}
          editable={!loading}
          error={errors?.password?.message}
          autoCapitalize={"none"}
        />

        <ButtonComponent
          onPress={handleSubmit(_calldata)}
          enabled={formState.isValid}>
          {loading ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </ButtonComponent>
        <ButtonComponent
          onPress={() => {
            navigation.navigate("SignUpPage");
          }}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </ButtonComponent>
      </ScrollView>
    </>
  );
};

export default SignIn;
