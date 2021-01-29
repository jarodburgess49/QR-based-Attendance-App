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

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, teacherInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  switch (action.payload) {
    case CREATE_TEACHER_REQUEST:
      return { loading: true };
    case CREATE_TEACHER_SUCCESS:
      return { loading: false, teacherInfo: action.payload };
    case CREATE_TEACHER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateReducer = (state = {}, action) => {
  switch (action.payload) {
    case UPDATE_TEACHER_REQUEST:
      return { loading: true };
    case UPDATE_TEACHER_SUCCESS:
      return { loading: false, teacherInfo: action.payload };
    case UPDATE_TEACHER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
