import React, { FC } from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";

import styles from "./styles";
import { ButtonsDetailsGroup } from "./components";

interface DetailsGroupRouteParams {
  id: string;
}

const DetailsGroup: FC = () => {
  const route = useRoute();
  const params = route.params as DetailsGroupRouteParams;

  const { id } = params;

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Ionicons name="md-people" color="#4d6e92" size={50} />
      </View>
      <Text style={styles.title}>data?.name {id}</Text>
      <Text style={[styles.description, styles.limitWidth]}>
        data?.description
      </Text>
      {true && <ButtonsDetailsGroup />}
    </View>
  );
};

export default DetailsGroup;
