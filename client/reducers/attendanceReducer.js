import {
  CREATE_ATTENDANCE_FAIL,
  CREATE_ATTENDANCE_REQUEST,
  CREATE_SINGLE_RECORD,
  CREATE_ATTENDANCE_SUCCESS,
  GET_ATTENDANCE_SUCCESS,
  GET_ATTENDANCE_REQUEST,
  GET_ATTENDANCE_FAIL,
  RECORDS_RESET,
  GET_ATTENDANCE_LIST_REQUEST,
  GET_ATTENDANCE_LIST_SUCCESS,
  GET_ATTENDANCE_LIST_FAIL,
  ADD_STUDENT_FAIL,
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_SUCCESS,
  ATTENDANCE_DELETE_FAIL,
  ATTENDANCE_DELETE_SUCCESS,
  ATTENDANCE_DELETE_REQUEST,
} from "../constants";

export const studentsAttendance = (state = [], action) => {
  switch (action.payload) {
    case CREATE_SINGLE_RECORD:
      return [...state, action.payload];
    case RECORDS_RESET:
      return [];
    default:
      return state;
  }
};

export const createAttendanceRecord = (state = {}, action) => {
  switch (action.payload) {
    case CREATE_ATTENDANCE_REQUEST:
      return { loading: true, record: {} };

    case CREATE_ATTENDANCE_SUCCESS:
      return { loading: false, success: true, record: action.payload };
    case CREATE_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAttendanceReducer = (state = { attendances: [] }, action) => {
  switch (action.type) {
    case GET_ATTENDANCE_REQUEST:
      return { loading: true, attendances: [] };
    case GET_ATTENDANCE_SUCCESS:
      return { loading: false, success: true, attendances: action.payload };
    case GET_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getStudentListReducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case GET_ATTENDANCE_LIST_REQUEST:
      return { loading: true, students: [] };
    case GET_ATTENDANCE_LIST_SUCCESS:
      return { loading: false, success: true, students: action.payload };
    case GET_ATTENDANCE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_STUDENT_REQUEST:
      return { loading: true, student: {} };
    case ADD_STUDENT_SUCCESS:
      return { loading: false, student: action.payload };
    case ADD_STUDENT_FAIL:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};

export const attendanceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ATTENDANCE_DELETE_REQUEST:
      return { loading: true };
    case ATTENDANCE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ATTENDANCE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
