import {
  EMPLOYMENT_CREATE_FAILED,
  EMPLOYMENT_CREATE_REQUEST,
  EMPLOYMENT_CREATE_RESET,
  EMPLOYMENT_CREATE_SUCCESS,
  EMPLOYMENT_LIST_FAILED,
  EMPLOYMENT_LIST_REQUEST,
  EMPLOYMENT_LIST_SUCCESS,
} from "../constants/employmentConstant";

export const employmentListReducer = (
  state = {
    employment: [],
    prev_page: null,
    cur_page: null,
    next_page: null,
    total_page: null,
  },
  action
) => {
  switch (action.type) {
    case EMPLOYMENT_LIST_REQUEST:
      return { loading: true, employment: [] };
    case EMPLOYMENT_LIST_SUCCESS:
      return {
        loading: false,
        employment: action.payload.content,
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
    case EMPLOYMENT_LIST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const employmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYMENT_CREATE_REQUEST:
      return { loading: true };
    case EMPLOYMENT_CREATE_SUCCESS:
      return { loading: false, success: true, EMPLOYMENT: action.payload };
    case EMPLOYMENT_CREATE_RESET:
      return {};
    case EMPLOYMENT_CREATE_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
