import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/teacherActions";
import { showMessage } from "react-native-flash-message";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const info = useSelector((state) => state.teacherLogin);
  const { loading, error, success, teacherInfo } = info;

  const submitHandler = async () => {
    dispatch(login(email, password));
    if (!loading) {
      props.navigation.navigate({
        routeName: "Menu",
        params: {
          userName: teacherInfo.name,
        },
      });
    } else if (error) {
      Alert.alert(
        "Unregistered Login",
        "The credentials provided doesn't match any user in the database",
        [
          {
            text: "Ok",
            onPress: () => console.log("Ok pressed"),
          },
          {
            text: "Register",
            onPress: () => props.navigation.navigate("Register"),
          },
        ]
      );
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <>
          <Text style={styles.formLabel}> Login </Text>
          <View>
            <Text styles={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter Email"
              style={styles.inputStyle}
              value={email}
              onChangeText={setEmail}
            />
            <Text styles={styles.label}>Password</Text>

            <TextInput
              secureTextEntry={true}
              placeholder="Enter Password"
              style={styles.inputStyle}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={submitHandler}
              style={styles.appButtonContainer1}
            >
              <Text style={styles.appButtonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  label: {
    marginBottom: -30,
  },
  appButtonContainer1: {
    elevation: 8,
    marginTop: 20,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },

  formLabel: {
    fontSize: 20,
    color: "black",
    marginBottom: 40,
    marginTop: -200,
  },
  inputStyle: {
    marginTop: 10,
    width: 300,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: "#DCDCDC",
  },
  formText: {
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 20,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});
