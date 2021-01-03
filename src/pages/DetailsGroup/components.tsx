import React, { FC } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import { useDetailsGroup } from "../../hooks/DetailsGroupContext";
import { useAuth } from "../../hooks/AuthContext";

interface CardListProps {
  name: string;
  description: string;
  deadline: Date | undefined;
  onPress: () => void;
}

const ButtonsDetailsGroup: FC = () => {
  const { groupData } = useDetailsGroup();
  const navigation = useNavigation();
  return (
    <View>
      <Text
        style={styles.createAction}
        onPress={() => {
          navigation.navigate("LinkByEmailPage", { idClass: groupData.id });
        }}>
        Vincular aluno
      </Text>
      <Text
        style={styles.createAction}
        onPress={() => {
          console.log("clicou ciar atividade");
        }}>
        Criar nova Atividade
      </Text>
    </View>
  );
};

const ListActivities: FC = () => {
  const { loading, activitiesData, groupData } = useDetailsGroup();
  const { user } = useAuth();
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator color="#000" size="large" />
      ) : (
        activitiesData.map(activity => {
          const isTeacher = user.id === groupData.teacher.id;
          return (
            <CardList
              key={activity.id}
              name={activity.name}
              description={activity.description}
              deadline={activity.deadline}
              onPress={() => {
                if (isTeacher) {
                  console.log(activity.id);
                } else {
                  console.log("é aluno");
                }
              }}
            />
          );
        })
      )}
    </ScrollView>
  );
};

const CardList: FC<CardListProps> = ({
  name,
  description,
  deadline,
  onPress
}: CardListProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.status}>
        {true ? (
          <MaterialIcons name="assignment" size={30} color="#4d6e92" />
        ) : (
          <Ionicons
            name="md-checkmark-circle-outline"
            color="#74b87b"
            size={30}
          />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.titleCard}>{name}</Text>
        <Text style={styles.descriptionCard}>{description}</Text>

        {deadline && (
          <View style={styles.date}>
            <Ionicons name="calendar-outline" size={24} />
            <Text style={styles.textDate}>
              {format(deadline, "  dd/MM/yyyy hh:mm")}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export { ButtonsDetailsGroup, ListActivities };
