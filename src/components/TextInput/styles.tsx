import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  label: {
    marginBottom: 8
  },
  labelError: {
    marginBottom: 8,
    fontWeight: "700"
  },
  labelColor: {
    color: "#4d6e92"
  },
  labelColorError: {
    color: "#e63900"
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderColor: "#4d6e92",
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: "top",
    color: "#000"
  },
  inputBorder: {
    borderColor: "#4d6e92"
  },
  inputBorderError: {
    borderColor: "#e63900"
  },
  lowerCase: {
    textTransform: "lowercase"
  }
});

export default styles;
