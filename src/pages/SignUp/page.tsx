import React, { FC } from "react";
import { ScrollView, Image, Text, View, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { ButtonComponent, TextInputComponent } from "../../components";
import { useSignUp } from "../../hooks/SignUpContext";
import Logo from "../../assets/logo.png";
import styles from "./styles";

type FormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const rules = {
  name: {
    required: "Campo obrigatório",
    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
    maxLength: { value: 20, message: "Máximo de 20 caracteres" }
  },
  surname: {
    required: "Campo obrigatório",
    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
    maxLength: { value: 50, message: "Máximo de 50 caracteres" }
  },
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

const SignUp: FC = () => {
  const navigation = useNavigation();

  const { singUp, loading } = useSignUp();

  const _calldata = async (data: FormData) => {
    console.log(data);
    await singUp(data);
  };

  const { errors, handleSubmit, control, formState, watch } = useForm<FormData>(
    {
      mode: "onChange",
      defaultValues: {
        name: undefined,
        surname: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined
      }
    }
  );

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 24 }}>
        <View style={styles.imageContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <TextInputComponent
          label={"Nome *"}
          control={control}
          name={"name"}
          rules={rules.name}
          placeholder={"Insira seu nome"}
          autoCompleteType="name"
          editable={!loading}
          error={errors?.name?.message}
        />
        <TextInputComponent
          label={"Sobrenome *"}
          control={control}
          name={"surname"}
          rules={rules.surname}
          placeholder={"Insira seu sobrenome"}
          autoCompleteType="name"
          editable={!loading}
          error={errors?.surname?.message}
        />
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
        />
        <TextInputComponent
          label={"Confirmação de Senha *"}
          control={control}
          name={"confirmPassword"}
          rules={{
            required: "Campo obrigatório",
            validate: value =>
              value === watch("password") || "Senhas devem ser iguais"
          }}
          placeholder={"Confirme sua senha"}
          autoCompleteType="password"
          secureTextEntry={true}
          editable={!loading}
          error={errors?.confirmPassword?.message}
        />

        <ButtonComponent
          onPress={handleSubmit(_calldata)}
          enabled={formState.isValid}>
          {loading ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <Text style={styles.buttonText}>Criar Conta</Text>
          )}
        </ButtonComponent>
        <ButtonComponent
          onPress={() => {
            navigation.navigate("SignInPage");
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </ButtonComponent>
      </ScrollView>
    </>
  );
};

export default SignUp;
