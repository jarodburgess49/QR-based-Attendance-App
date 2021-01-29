import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

const StartScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>QR Based</Text>
      <Text style={styles.text}>Attendance System</Text>
      <View style={{ marginTop: 60 }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Login");
          }}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Register");
          }}
          style={styles.appButtonContainer1}
        >
          <Text style={styles.appButtonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  screen: {
    alignContent: "center",
    padding: 60,
  },

  text: {
    fontSize: 26,
    textTransform: "uppercase",
  },

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
