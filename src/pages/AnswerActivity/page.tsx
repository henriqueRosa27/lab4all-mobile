import React, { FC, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

import styles from "./styles";
import { TextInputComponent, ButtonComponent } from "../../components";
import { Camera } from "./components";
import { TakePictureResponse } from "react-native-camera";
import { useAnswerActivity } from "../../hooks/AnswerActivityContext";

import ml from "@react-native-firebase/ml";

type FormData = {
  note: string;
  report?: string;
};

interface DetailsGroupRouteParams {
  idActivity: string;
  hasAnswer: boolean;
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
  const { answer, loading, get, loadingGet, data } = useAnswerActivity();
  const navigation = useNavigation();
  const route = useRoute();
  const { idActivity, hasAnswer } = route.params as DetailsGroupRouteParams;

  useEffect(() => {
    if (hasAnswer) {
      get(idActivity);
    }
  }, []);

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

  const _callData = async ({ note, report }: FormData) => {
    answer({
      note,
      report: report!,
      idActivity: idActivity,
      image: selectedImage!
    });
  };

  const _onTakePhoto = async (data: TakePictureResponse) => {
    setCameraIsOpen(false);
    setSelectedImage(data.uri);

    await processDocument(data.uri);
  };

  async function processDocument(path: string) {
    const processed = await ml().cloudDocumentTextRecognizerProcessImage(path);

    console.log("Found text in document: ", processed.text);

    setValue("report", processed.text);

    processed.blocks.forEach(block => {
      console.log("Found block with text: ", block.text);
      console.log("Confidence in block: ", block.confidence);
      console.log("Languages found in block: ", block.recognizedLanguages);
    });
  }

  const _resetImage = () => {
    setSelectedImage(null);
  };

  const renderBody = () => {
    return (
      <>
        <TextInputComponent
          label={"O que achou da atividade? *"}
          control={control}
          name={"note"}
          placeholder={"O que achou da atividade?"}
          autoCompleteType="name"
          rules={rules.note}
          editable={!loading && !hasAnswer}
          error={errors?.note?.message}
          defaultValue={data?.note}
        />
        {!selectedImage && !hasAnswer ? (
          <ButtonComponent
            onPress={() => {
              setCameraIsOpen(true);
            }}>
            <Text style={styles.buttonText}>Inserir foto</Text>
          </ButtonComponent>
        ) : (
          <View
            style={{
              margin: 5,
              width: 220,
              height: 220,
              alignContent: "center",
              alignSelf: "center",
              borderColor: "#000",
              borderStyle: "solid",
              borderWidth: 3,
              borderRadius: 5
            }}>
            <Image
              resizeMode="cover"
              source={{ uri: hasAnswer ? data?.image : selectedImage }}
              style={{
                flex: 1
              }}
            />
            {!hasAnswer && (
              <View
                style={{
                  position: "absolute",
                  right: 5,
                  backgroundColor: "transparent"
                }}>
                <IconButton
                  icon="close-circle-outline"
                  color="#000"
                  size={25}
                  onPress={_resetImage}
                />
              </View>
            )}
          </View>
        )}
        {(selectedImage || hasAnswer) && (
          <TextInputComponent
            label={"Texto extraido"}
            control={control}
            name={"report"}
            placeholder={"Texto extraido"}
            autoCompleteType="name"
            editable={!loading && !hasAnswer}
            multiline={true}
            numberOfLines={10}
            defaultValue={data?.report}
          />
        )}
        {!hasAnswer && (
          <ButtonComponent
            onPress={handleSubmit(_callData)}
            enabled={formState.isValid}>
            {loading ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <Text style={styles.buttonText}>Concluir</Text>
            )}
          </ButtonComponent>
        )}
        <ButtonComponent
          onPress={() => {
            navigation.goBack();
          }}>
          {loading ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <Text style={styles.buttonText}>Cancelar</Text>
          )}
        </ButtonComponent>
      </>
    );
  };

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
      {loadingGet ? (
        <ActivityIndicator color="#000" size="large" />
      ) : (
        renderBody()
      )}
    </ScrollView>
  );
};

export default CreateActivity;
