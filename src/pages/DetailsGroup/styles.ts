import { Dimensions, Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 24
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
  title: {
    fontSize: 20,
    color: "#2d5f96",
    fontWeight: "400"
  },
  description: {
    textAlign: "center",
    marginVertical: 15
  },
  limitWidth: {
    width: Platform.OS === "web" ? 300 : Dimensions.get("window").width / 1.5
  },
  createAction: {
    color: "#2d5f96",
    width: Dimensions.get("screen").width - 40,
    textAlign: "right",
    marginTop: 15,
    marginBottom: 5,
    textDecorationLine: "underline"
  }
});
