import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "../actions/attendanceActions";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ScannerScreen = (props) => {
  let name, rollno, branch;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [set, setSet] = useState({});

  const dispatch = useDispatch();
  const recordId = props.navigation.getParam("courseId");
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setSet(type);
    const splitted = data.split(" ");
    name = splitted[0];
    rollno = splitted[1];
    branch = splitted[2];

    Alert.alert(
      "Barcode Scanned",
      `Bar code with type ${type} and data ${data} has been scanned!`,
      [
        {
          text: "Ok",
          onPress: () => {
            dispatch(addStudent(recordId, name, rollno, branch));
            props.navigation.goBack();
          },
        },
      ]
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        on
      />
      {scanned && (
        <Button
          title={"Tap to Scan Again"}
          onPress={() => {
            setScanned(false);
          }}
        />
      )}
    </View>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({});
