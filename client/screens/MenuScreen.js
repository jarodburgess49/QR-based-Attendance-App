import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { logout } from "../actions/teacherActions";
import { useDispatch, useSelector } from "react-redux";

const MenuScreen = (props) => {
  const info = useSelector((state) => state.teacherLogin);
  const { loading } = info;
  const dispatch = useDispatch();
  const { navigation } = props;
  return (
    <View style={{ padding: 60, alignContent: "center" }}>
      <View style={{ marginTop: 60 }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Create");
          }}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>ADD COURSE AND SCHEDULE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Attendance");
          }}
          style={styles.appButtonContainer1}
        >
          <Text style={styles.appButtonText}>ADD STUDENT ATTENDANCE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Profile");
          }}
          style={styles.appButtonContainer1}
        >
          <Text style={styles.appButtonText}>PROFILE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(logout());
            navigation.navigate("Start");
          }}
          style={styles.appButtonContainer1}
        >
          <Text style={styles.appButtonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

MenuScreen.navigationOptions = (navigationData) => {
  const headerName = navigationData.navigation.getParam("userName");

  return {
    headerTitle: `Welcome ${headerName}`,
  };
};

export default MenuScreen;

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonContainer1: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 20,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
