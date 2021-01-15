import { StyleSheet, Platform, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  description: {
    color: "#000",
    textAlign: "center",
    marginVertical: 15
  },
  circle: {
    backgroundColor: "#eeeeee",
    width: 90,
    height: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginVertical: 15,
    borderColor: "#ccc",
    borderWidth: 1
  },
  limitWidth: {
    width: Platform.OS === "web" ? 300 : Dimensions.get("window").width / 1.5
  },
  containerCenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF"
  }
});
