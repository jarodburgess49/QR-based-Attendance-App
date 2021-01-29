import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector, useDispatch } from "react-redux";
import { addAttendance } from "../actions/attendanceActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
const CreateAttendanceScreen = (props) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [course, setCourse] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const dispatch = useDispatch();
  const record = useSelector((state) => state.attendance);
  const { loading } = record;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <>
          <Text style={styles.formLabel}> ATTENDANCE </Text>
          <View>
            <Text styles={styles.label}>Course Name</Text>
            <TextInput
              placeholder="Enter Course Name"
              style={styles.inputStyle}
              value={course}
              onChangeText={setCourse}
            />
            <View>
              <Text styles={styles.label}>Date</Text>
              <Button onPress={showDatepicker} title="Select Date" />
            </View>
            <View>
              <Text styles={styles.label}>Time</Text>
              <Button onPress={showTimepicker} title="Select Time" />
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <View style={{ marginTop: 60 }}>
              <Button
                onPress={() => {
                  dispatch(addAttendance(course, date, time));
                  props.navigation.pop();
                }}
                title="Save"
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CreateAttendanceScreen;

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
