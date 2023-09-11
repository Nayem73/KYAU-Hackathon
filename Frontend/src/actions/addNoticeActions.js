import axios from "axios";
import {
  NOTICE_CREATE_FAILED,
  NOTICE_CREATE_REQUEST,
  NOTICE_CREATE_SUCCESS,
  NOTICE_LIST_FAILED,
  NOTICE_LIST_REQUEST,
  NOTICE_LIST_SUCCESS,
} from "../constants/addNoticeConstant";

export const addNoticeListAction = (params) => async (dispatch, getState) => {
  let page = 0;
  if (params) {
    page = params.page || 0;
  }
  try {
    dispatch({
      type: NOTICE_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/notice/?page=${page}`);
    dispatch({
      type: NOTICE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NOTICE_LIST_FAILED,
      payload: error.response.data.message
        ? error.response.data.message
        : error.response
        ? error.message
        : "error",
    });
  }
};

export const createNotice = (FormData) => async (dispatch, getState) => {
  try {
      dispatch({
          type: NOTICE_CREATE_REQUEST
      })

      const { userLogin: { userInfo } } = getState();

      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }
      const { data } = await axios.post(`/api/notice/`, FormData, config)
      dispatch({
          type: NOTICE_CREATE_SUCCESS,
          payload: data
      })
  } catch (error) {
      dispatch({
          type: NOTICE_CREATE_FAILED,
          payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
      })
  }
}
