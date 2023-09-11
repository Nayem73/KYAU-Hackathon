import axios from "axios";
import {
  EMPLOYMENT_CREATE_FAILED,
  EMPLOYMENT_CREATE_REQUEST,
  EMPLOYMENT_CREATE_SUCCESS,
  EMPLOYMENT_LIST_FAILED,
  EMPLOYMENT_LIST_REQUEST,
  EMPLOYMENT_LIST_SUCCESS,
} from "../constants/employmentConstant";

export const employmentListAction = (params) => async (dispatch, getState) => {
  let page = 0;
  if (params) {
    page = params.page || 0;
  }
  try {
    dispatch({
      type:  EMPLOYMENT_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/employment/?page=${page}`);
    dispatch({
      type:  EMPLOYMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type:  EMPLOYMENT_LIST_FAILED,
      payload: error.response.data.message
        ? error.response.data.message
        : error.response
        ? error.message
        : "error",
    });
  }
};

export const createEmployment = (FormData) => async (dispatch, getState) => {
  try {
      dispatch({
          type:  EMPLOYMENT_CREATE_REQUEST
      })

      const { userLogin: { userInfo } } = getState();

      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }
      const { data } = await axios.post(`/api/employment/`, FormData, config)
      dispatch({
          type:  EMPLOYMENT_CREATE_SUCCESS,
          payload: data
      })
  } catch (error) {
      dispatch({
          type:  EMPLOYMENT_CREATE_FAILED,
          payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
      })
  }
}
