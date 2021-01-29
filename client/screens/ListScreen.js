import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { getStudents } from "../actions/attendanceActions";
import { useDispatch, useSelector } from "react-redux";
import StudentCard from "../components/StudentCard";

const ListScreen = (props) => {
  //const { navigation } = props;
  const dispatch = useDispatch();
  const { navigation } = props;
  const recordId = props.navigation.getParam("id");
  const studentsArray = useSelector((state) => state.students);
  const { students, loading } = studentsArray;
  const loadData = async () => {
    dispatch(getStudents(recordId));
  };
  useEffect(() => {
    loadData();
  }, [recordId, navigation]);
  const renderCard = ({ item }) => {
    return (
      <StudentCard
        id={item._id}
        name={item.name}
        rollno={item.rollno}
        branch={item.branch}
        teacher={item.teacher}
      />
    );
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="black"
          style={{ marginVertical: 90 }}
        />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ marginTop: 10, marginLeft: 50, marginRight: 50 }}>
            <Button
              title="ADD ATTENDANCE"
              onPress={() => {
                props.navigation.navigate({
                  routeName: "Scanner",
                  params: {
                    courseId: recordId,
                  },
                });
              }}
              color="black"
            />
          </View>

          <FlatList
            data={students.students}
            keyExtractor={(item) => item._id}
            renderItem={renderCard}
          />
        </SafeAreaView>
      )}
    </>
  );
};
ListScreen.navigationOptions = (navigationData) => {
  const headerName = navigationData.navigation.getParam("course");

  return {
    headerTitle: ` Attendance for ${headerName}`,
  };
};

export default ListScreen;

const styles = StyleSheet.create({});
