import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  loginReducer,
  registerReducer,
  updateReducer,
} from "../reducers/teacherReducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  studentsAttendance,
  createAttendanceRecord,
  getAttendanceReducer,
  getStudentListReducer,
  addStudentReducer,
  attendanceDeleteReducer,
} from "../reducers/attendanceReducer";

const reducers = combineReducers({
  teacherLogin: loginReducer,
  registerUser: registerReducer,
  attendance: createAttendanceRecord,
  records: getAttendanceReducer,
  students: getStudentListReducer,
  addStudent: addStudentReducer,
  deleteAttendance: attendanceDeleteReducer,
  updateUser: updateReducer,
});
let teacherLocalStorage;
const setData = async () => {
  const info = await AsyncStorage.getItem("userInfo");

  if (info) {
    teacherLocalStorage = JSON.parse(info);
  } else {
    teacherLocalStorage = null;
  }
};
setData();

const initialState = {
  teacherLogin: { teacherInfo: teacherLocalStorage },
};
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
