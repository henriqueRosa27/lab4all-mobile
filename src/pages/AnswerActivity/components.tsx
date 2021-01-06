import React, { FC } from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import {
  RNCamera,
  TakePictureResponse,
  TakePictureOptions
} from "react-native-camera";

let camera: RNCamera;

interface CameraProps {
  cameraOptions: TakePictureOptions;
  onTakePhoto: (response: TakePictureResponse) => void;
}

const Camera: FC<CameraProps> = ({
  onTakePhoto,
  cameraOptions
}: CameraProps) => {
  const takePicture = async () => {
    const data = await camera.takePictureAsync(cameraOptions);

    onTakePhoto(data);
  };

  return (
    <View
      style={{
        position: "absolute",
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
      }}>
      <RNCamera
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel"
        }}
        captureAudio={false}
        style={{ flex: 1, alignItems: "center" }}
        ref={(ref: RNCamera) => {
          camera = ref;
        }}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        type={RNCamera.Constants.Type.back}
      />
      <View style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={takePicture}
          style={{
            flex: 0,
            backgroundColor: "#fff",
            borderRadius: 5,
            padding: 15,
            paddingHorizontal: 20,
            alignSelf: "center",
            margin: 20
          }}>
          <Text style={{ fontSize: 14 }}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { Camera };
