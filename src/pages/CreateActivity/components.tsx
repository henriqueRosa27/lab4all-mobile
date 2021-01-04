import React, { FC } from "react";
import { Modal, Text, View, TouchableHighlight } from "react-native";
import DatePicker from "react-native-date-picker";

import styles from "./styles";
// import { useCreateGroup } from "../../hooks/CreateGroupContext";

interface ModalDateTimePickerProps {
  visible: boolean;
  date: Date;
  setDate: (date: Date) => void;
  closeModal: () => void;
}

const ModalDateTimePicker: FC<ModalDateTimePickerProps> = ({
  visible,
  date,
  setDate,
  closeModal
}: ModalDateTimePickerProps) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View>
        <View style={styles.modalView}>
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode="datetime"
            locale="pt-BR"
            is24hourSource="locale"
            minimumDate={new Date()}
          />
          <TouchableHighlight
            style={{
              borderRadius: 20,
              padding: 10,
              elevation: 2,
              backgroundColor: "#2196F3"
            }}
            onPress={closeModal}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center"
              }}>
              Ok
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

export { ModalDateTimePicker };
