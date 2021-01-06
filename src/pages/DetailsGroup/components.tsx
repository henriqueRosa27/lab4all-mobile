import React, { FC } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { format, isAfter } from "date-fns";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import { useDetailsGroup } from "../../hooks/DetailsGroupContext";
import { useAuth } from "../../hooks/AuthContext";

interface CardListProps {
  name: string;
  description: string;
  deadline: Date | undefined;
  onPress: () => void;
  isTeacher: boolean;
  totalStudents: number;
  totalAnswer: number;
  hasAnswer: boolean;
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
          navigation.navigate("CreateActivityPage", { idClass: groupData.id });
        }}>
        Criar nova Atividade
      </Text>
    </View>
  );
};

const ListActivities: FC = () => {
  const { loading, activitiesData, groupData } = useDetailsGroup();
  const { user } = useAuth();
  const navigation = useNavigation();
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
              isTeacher={isTeacher}
              totalAnswer={activity.totalAnswer}
              totalStudents={groupData.totalStudents}
              hasAnswer={activity.hasAnswer}
              onPress={() => {
                if (isTeacher) {
                  console.log(activity.id);
                } else {
                  navigation.navigate("AnswerActivityPage", {
                    idActivity: activity.id
                  });
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
  onPress,
  isTeacher,
  totalAnswer,
  totalStudents,
  hasAnswer
}: CardListProps) => {
  const renderIconCardToStudent = () => {
    let icon: JSX.Element;

    if (hasAnswer) {
      icon = (
        <Ionicons
          name="checkmark-done-circle-outline"
          color="#74b87b"
          size={30}
        />
      );
    } else if (!deadline) {
      icon = (
        <Ionicons name="ios-remove-circle-outline" color="#000" size={30} />
      );
    } else if (isAfter(new Date(deadline), new Date())) {
      icon = (
        <Ionicons name="ios-close-circle-outline" color="#fa051d" size={30} />
      );
    } else {
      icon = (
        <Ionicons name="ios-alert-circle-outline" color="#fcba03" size={30} />
      );
    }

    return icon;
  };

  const renderIconCard = () => {
    return (
      <View style={styles.status}>
        {isTeacher ? (
          <MaterialIcons name="assignment" size={30} color="#4d6e92" />
        ) : (
          renderIconCardToStudent()
        )}
      </View>
    );
  };
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {renderIconCard()}
      <View style={styles.content}>
        <Text style={styles.titleCard}>{name}</Text>
        <Text style={styles.descriptionCard}>{description}</Text>

        {deadline && (
          <View style={styles.date}>
            <Ionicons name="calendar-outline" size={24} />
            <Text style={styles.textDate}>
              {format(new Date(deadline), "  dd/MM/yyyy hh:mm")}
            </Text>
          </View>
        )}
      </View>
      {isTeacher && (
        <View style={styles.contentToTeacher}>
          <Text style={styles.titleCard}>
            {totalAnswer}/{totalStudents}
          </Text>
          <Text style={styles.descriptionCard}>Responderam</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export { ButtonsDetailsGroup, ListActivities };
