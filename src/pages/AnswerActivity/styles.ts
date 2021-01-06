import { StyleSheet, Platform, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  title: {
    fontSize: 20,
    color: "#2d5f96",
    fontWeight: "400"
  },
  description: {
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
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "stretch",
    marginBottom: 15,
  },
});
