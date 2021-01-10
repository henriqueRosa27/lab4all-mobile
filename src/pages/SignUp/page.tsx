import React, { FC } from "react";
import { ScrollView, Image, Text, View, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { ButtonComponent, TextInputComponent } from "../../components";
import { useSignUp } from "../../hooks/SignUpContext";
import Logo from "../../assets/logo.png";
import { FormData, rules } from "./helpers";
import styles from "./styles";

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
          autoCapitalize={"none"}
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
