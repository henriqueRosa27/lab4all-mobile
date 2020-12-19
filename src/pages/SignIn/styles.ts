import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  imageContainer: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20
  },
  label: {
    color: "#4d6e92",
    marginBottom: 8
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
  buttonText: {
    fontSize: 16,
    color: "#FFF"
  }
});

export default styles;
