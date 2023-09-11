import {
  ADDVERTISE_CREATE_FAILED,
  ADDVERTISE_CREATE_REQUEST,
  ADDVERTISE_CREATE_RESET,
  ADDVERTISE_CREATE_SUCCESS,
  ADDVERTISE_LIST_FAILED,
  ADDVERTISE_LIST_REQUEST,
  ADDVERTISE_LIST_SUCCESS,
} from "../constants/addvertiseConstant";

export const addvertiseReducer = (
  state = {
    addvertise: [],
    prev_page: null,
    cur_page: null,
    next_page: null,
    total_page: null,
  },
  action
) => {
  switch (action.type) {
    case ADDVERTISE_LIST_REQUEST:
      return { loading: true, addvertise: [] };
    case ADDVERTISE_LIST_SUCCESS:
      return {
        loading: false,
        addvertise: action.payload.content,
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
    case ADDVERTISE_LIST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addvertiseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDVERTISE_CREATE_REQUEST:
      return { loading: true };
    case ADDVERTISE_CREATE_SUCCESS:
      return { loading: false, success: true, addvertise: action.payload };
    case ADDVERTISE_CREATE_RESET:
      return {};
    case ADDVERTISE_CREATE_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
