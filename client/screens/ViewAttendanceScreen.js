import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getRecords } from "../actions/attendanceActions";

import CardRender from "../components/Card";

const ViewAttendanceScreen = (props) => {
  const data = useSelector((state) => state.records);
  const teacherData = useSelector((state) => state.teacherLogin);
  const { teacherInfo } = teacherData;
  const { attendances, loading } = data;

  const dispatch = useDispatch();
  const loadData = () => {
    dispatch(getRecords());
  };
  const renderCard = ({ item }) => {
    console.log(item);
    return (
      <CardRender
        id={item._id}
        course={item.course}
        date={item.date}
        time={item.time}
        students={item.students}
        name={teacherInfo.name}
        navigation={props.navigation}
      />
    );
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 120 }}
          size="large"
          color="black"
        />
      ) : (
        <View>
          <FlatList
            data={attendances}
            keyExtractor={(item) => item._id}
            renderItem={renderCard}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ViewAttendanceScreen;

const styles = StyleSheet.create({});
