import {
  CREATE_ATTENDANCE_FAIL,
  CREATE_ATTENDANCE_REQUEST,
  CREATE_ATTENDANCE_SUCCESS,
  CREATE_SINGLE_RECORD,
  GET_ATTENDANCE_SUCCESS,
  GET_ATTENDANCE_FAIL,
  GET_ATTENDANCE_REQUEST,
  GET_ATTENDANCE_LIST_FAIL,
  GET_ATTENDANCE_LIST_SUCCESS,
  GET_ATTENDANCE_LIST_REQUEST,
  RECORDS_RESET,
  ADD_STUDENT_FAIL,
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_SUCCESS,
  ATTENDANCE_DELETE_FAIL,
  ATTENDANCE_DELETE_REQUEST,
  ATTENDANCE_DELETE_SUCCESS,
} from "../constants";
import axios from "axios";
import server from "../config";

export const addAttendance = (course, date, time) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CREATE_ATTENDANCE_REQUEST });
    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${server.BACKEND_API}/create`,
      { course, date, time },
      config
    );

    dispatch({
      type: CREATE_ATTENDANCE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_ATTENDANCE_FAIL,
      payload: err,
    });
  }
};

export const getRecords = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ATTENDANCE_REQUEST });
    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };
    const { data } = await axios.get(`${server.BACKEND_API}/`, config);

    dispatch({
      type: GET_ATTENDANCE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_ATTENDANCE_FAIL,
      payload: err,
    });
  }
};

export const getStudents = (recordId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ATTENDANCE_LIST_REQUEST });
    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${server.BACKEND_API}/list`,
      { recordId },
      config
    );
    dispatch({
      type: GET_ATTENDANCE_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_ATTENDANCE_LIST_FAIL,
      payload: err,
    });
  }
};

export const addStudent = (recordId, name, rollno, branch) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ADD_STUDENT_REQUEST });
    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${server.BACKEND_API}/add`,
      { recordId, name, rollno, branch },
      config
    );

    dispatch({
      type: ADD_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ADD_STUDENT_FAIL,
      payload: err,
    });
  }
};

export const deleteAttendance = (recordId, navigation) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ATTENDANCE_DELETE_REQUEST });
    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };
    const { data } = await axios.delete(
      `${server.BACKEND_API}/${recordId}`,
      config
    );
    if (data) {
      navigation.navigate("Menu");
    }

    dispatch({
      type: ATTENDANCE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ATTENDANCE_DELETE_FAIL,
      payload: err,
    });
  }
};
