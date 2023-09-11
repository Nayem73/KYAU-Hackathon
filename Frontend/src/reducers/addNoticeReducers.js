import {
  NOTICE_CREATE_FAILED,
  NOTICE_CREATE_REQUEST,
  NOTICE_CREATE_RESET,
  NOTICE_CREATE_SUCCESS,
  NOTICE_LIST_FAILED,
  NOTICE_LIST_REQUEST,
  NOTICE_LIST_SUCCESS,
} from "../constants/addNoticeConstant";

export const noticeReducer = (
  state = {
    notice: [],
    prev_page: null,
    cur_page: null,
    next_page: null,
    total_page: null,
  },
  action
) => {
  switch (action.type) {
    case NOTICE_LIST_REQUEST:
      return { loading: true, notice: [] };
    case NOTICE_LIST_SUCCESS:
      return {
        loading: false,
        notice: action.payload.content,
        cur_page: action.payload.pageable.pageNumber,
        total_page: action.payload.totalPages,
        prev_page:
          action.payload.pageable.pageNumber > 0
            ? action.payload.pageable.pageNumber - 1
            : null,
        next_page:
          action.payload.pageable.pageNumber < action.payload.total_pages - 1
            ? action.payload.pageable.pageNumber + 1
            : null,
      };
    case NOTICE_LIST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const noticeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTICE_CREATE_REQUEST:
      return { loading: true };
    case NOTICE_CREATE_SUCCESS:
      return { loading: false, success: true, notice: action.payload };
    case NOTICE_CREATE_RESET:
      return {};
    case NOTICE_CREATE_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
