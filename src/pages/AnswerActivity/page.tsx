import React, { FC, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";

import styles from "./styles";
import { TextInputComponent, ButtonComponent } from "../../components";
import { Camera } from "./components";
import { TakePictureResponse } from "react-native-camera";
//import { useCreateActivity } from "../../hooks/CreateActivityContext";

import ml from "@react-native-firebase/ml";

type FormData = {
  note: string;
  report?: string;
};

interface DetailsGroupRouteParams {
  idActivity: string;
}

const rules = {
  note: {
    required: "Campo obrigatório",
    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
    maxLength: { value: 50, message: "Máximo de 50 caracteres" }
  }
};

const CreateActivity: FC = () => {
  const [cameraIsOpen, setCameraIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigation = useNavigation();
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
      note: undefined,
      report: undefined
    }
  });

  const _callData = async ({ note }: FormData) => {
    console.log({
      note,
      idActivity: params.idActivity
    });
  };

  const _onTakePhoto = async (data: TakePictureResponse) => {
    setCameraIsOpen(false);
    setSelectedImage(data.uri);
    setValue("report", "Aqui irá o texto extraido");
    //await processDocument(data.uri);
  };

  async function processDocument(path: string) {
    const processed = await ml().cloudDocumentTextRecognizerProcessImage(path);

    console.log("Found text in document: ", processed.text);

    processed.blocks.forEach(block => {
      console.log("Found block with text: ", block.text);
      console.log("Confidence in block: ", block.confidence);
      console.log("Languages found in block: ", block.recognizedLanguages);
    });
  }

  return cameraIsOpen ? (
    <Camera
      onTakePhoto={_onTakePhoto}
      cameraOptions={{ quality: 0.5, base64: true }}
    />
  ) : (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}>
      <View style={styles.containerCenter}>
        <View style={styles.circle}>
          <MaterialIcons name="assignment" size={60} color="#4d6e92" />
        </View>

        <Text style={[styles.title]}>Responder atividade</Text>
        <Text style={[styles.description, styles.limitWidth]}>
          Preencha corretamente os campos abaixo e clique em
          &quot;Concluir&quot;
        </Text>
      </View>
      <TextInputComponent
        label={"Algo a reportar *"}
        control={control}
        name={"note"}
        placeholder={"Algo a reportar"}
        autoCompleteType="name"
        rules={rules.note}
        editable={!false}
        error={errors?.note?.message}
      />

      {!selectedImage ? (
        <ButtonComponent
          onPress={() => {
            setCameraIsOpen(true);
          }}>
          <Text style={styles.buttonText}>Inserir foto</Text>
        </ButtonComponent>
      ) : (
        <View style={styles.containerCenter}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      )}

      {selectedImage && (
        <TextInputComponent
          label={"Texto extraido"}
          control={control}
          name={"report"}
          placeholder={"Texto extraido"}
          autoCompleteType="name"
          rules={rules.note}
          editable={false}
          multiline={true}
          numberOfLines={10}
        />
      )}

      <ButtonComponent
        onPress={handleSubmit(_callData)}
        enabled={formState.isValid}>
        {false ? (
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

export default CreateActivity;
