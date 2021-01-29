import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Card } from "react-native-elements";

const StudentCard = ({ name, rollno, branch, teacher, id }) => {
  return (
    <Card>
      <Card.Title style={{ textTransform: "uppercase" }}>{name}</Card.Title>
      <Card.Divider />
      <Text>ROLL NO. - {rollno}</Text>
      <Text>BRANCH - {branch}</Text>
    </Card>
  );
};

export default StudentCard;

const styles = StyleSheet.create({});
