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
  code: {
    fontSize: 16,
    color: "#2d5f96",
    fontWeight: "400",
    marginTop: 3
  },
  codeCopy: {
    textDecorationColor: "#2d5f96",
    textDecorationLine: "underline"
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
  },
  card: {
    display: "flex",
    backgroundColor: "#fff",
    padding: 10,
    width: Dimensions.get("screen").width - 40,
    marginVertical: 5,
    borderRadius: 7.5,
    minHeight: 50,
    shadowColor: "#e6e6e6",
    shadowOpacity: 22,
    shadowRadius: 2,
    flexDirection: "row"
  },
  status: {
    display: "flex",
    alignSelf: "center",
    paddingHorizontal: 10
  },
  titleCard: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 17,
    color: "#000"
  },
  content: {
    display: "flex",
    flex: 1
  },
  contentToTeacher: {
    alignItems: "center"
  },
  descriptionCard: {},
  date: {
    marginTop: 10,
    flexDirection: "row"
  },
  textDate: {
    marginLeft: 5
  }
});
