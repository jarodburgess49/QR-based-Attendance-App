import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteAttendance } from "../actions/attendanceActions";
import { Card } from "react-native-elements";

const CardRender = ({ course, date, time, students, name, navigation, id }) => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.deleteAttendance);
  const { loading } = info;
  return (
    <View>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 120 }}
          size="large"
          color="black"
        />
      ) : (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate({
                routeName: "List",
                params: {
                  id,
                  students,
                  course,
                },
              });
            }}
          >
            <Card>
              <Card.Title style={{ textTransform: "uppercase" }}>
                {course}
              </Card.Title>
              <Card.Divider />
              <Text>TIME - {time}</Text>
              <Text>DATE - {date}</Text>
              <Text>TEACHER - {name}</Text>
              <Card.Divider />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  title="VIEW"
                  onPress={() => {
                    navigation.navigate({
                      routeName: "List",
                      params: {
                        id,
                        students,
                        course,
                      },
                    });
                  }}
                  color="black"
                />
                <Button
                  title="DELETE"
                  onPress={() => {
                    dispatch(deleteAttendance(id, navigation));
                  }}
                  color="black"
                />
              </View>
            </Card>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CardRender;

const styles = StyleSheet.create({});
