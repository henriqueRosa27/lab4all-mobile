import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const api = axios.create({
  baseURL: "https://to-be-defined.herokuapp.com/",
  timeout: 60000
});

api.interceptors.request.use(async config => {
 if(!config.headers.authorization){
  const [token, user] = await AsyncStorage.multiGet([
    "@lab4all:token",
    "@lab4all:user"
  ]);
  if (token[1] && user[1]) {
    config.headers.authorization = `Bearer ${token[1]}`;
  }
 }

  return config;
});

export default api;
