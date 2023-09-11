import axios from "axios";
import {
  ADDVERTISE_CREATE_FAILED,
  ADDVERTISE_CREATE_REQUEST,
  ADDVERTISE_CREATE_SUCCESS,
  ADDVERTISE_LIST_FAILED,
  ADDVERTISE_LIST_REQUEST,
  ADDVERTISE_LIST_SUCCESS,
} from "../constants/addvertiseConstant";

export const addvertiseListAction = (params) => async (dispatch, getState) => {
  let page = 0;
  if (params) {
    page = params.page || 0;
  }
  try {
    dispatch({
      type: ADDVERTISE_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/adv/?page=${page}`);
    dispatch({
      type: ADDVERTISE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADDVERTISE_LIST_FAILED,
      payload: error.response.data.message
        ? error.response.data.message
        : error.response
        ? error.message
        : "error",
    });
  }
};

export const createAddvertise = (FormData) => async (dispatch, getState) => {
  try {
      dispatch({
          type: ADDVERTISE_CREATE_REQUEST
      })

      const { userLogin: { userInfo } } = getState();

      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }
      const { data } = await axios.post(`/api/adv/`, FormData, config)
      dispatch({
          type: ADDVERTISE_CREATE_SUCCESS,
          payload: data
      })
  } catch (error) {
      dispatch({
          type: ADDVERTISE_CREATE_FAILED,
          payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
      })
  }
}
