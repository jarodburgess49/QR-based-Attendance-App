import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { updateTeacher } from "../actions/teacherActions";

const ProfileScreen = (props) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const info = useSelector((state) => state.teacherLogin);
  const { teacherInfo } = info;

  const submitHandler = () => {
    dispatch(updateTeacher(name, lastname, email, password));
    props.navigation.navigate("Menu");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formLabel}> Update Profile</Text>
      <View>
        <Text styles={styles.label}>First Name</Text>
        <TextInput
          placeholder={teacherInfo.name}
          style={styles.inputStyle}
          value={name}
          onChangeText={setName}
        />
        <Text styles={styles.label}>Last Name</Text>
        <TextInput
          placeholder={teacherInfo.lastname}
          style={styles.inputStyle}
          value={lastname}
          onChangeText={setLastname}
        />
        <Text styles={styles.label}>Email</Text>
        <TextInput
          placeholder={teacherInfo.email}
          style={styles.inputStyle}
          value={email}
          onChangeText={setEmail}
        />
        <Text styles={styles.label}> New Password</Text>

        <TextInput
          secureTextEntry={true}
          placeholder={teacherInfo.password}
          style={styles.inputStyle}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={submitHandler}
          style={styles.appButtonContainer1}
        >
          <Text style={styles.appButtonText}>UPDATE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

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
