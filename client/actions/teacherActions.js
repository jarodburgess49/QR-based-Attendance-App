import {
  CREATE_TEACHER_FAIL,
  CREATE_TEACHER_REQUEST,
  CREATE_TEACHER_SUCCESS,
  LOGOUT,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  UPDATE_TEACHER_FAIL,
  UPDATE_TEACHER_REQUEST,
  UPDATE_TEACHER_SUCCESS,
} from "../constants";
import axios from "axios";
import server from "../config";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${server.BACKEND_API}/auth/login`,
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    AsyncStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signup = (name, lastname, email, password) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TEACHER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${server.BACKEND_API}/auth/register`,
      { name, lastname, email, password },
      config
    );

    dispatch({
      type: CREATE_TEACHER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    AsyncStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CREATE_TEACHER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("userInfo");

    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTeacher = (name, lastname, email, password) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_TEACHER_REQUEST });

    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${server.BACKEND_API}/auth/update`,
      { name, lastname, email, password },
      config
    );
    console.warn(data);
    dispatch({
      type: UPDATE_TEACHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TEACHER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
