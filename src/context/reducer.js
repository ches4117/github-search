export const initialState = {
  search: "",
  repos: [],
  page: 1,
  pageEnd: false,
  perPage: 10,
  error: undefined,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "setSearch":
      return {
        ...state,
        repos: [],
        search: action.payload?.search,
        pageEnd: false,
      };

    case "setRepos":
      return {
        ...state,
        repos: action.payload?.repos,
        page: 1,
        pageEnd: action.payload?.repos?.length === 0,
        error: undefined,
      };

    case "setMoreRepos":
      return {
        ...state,
        repos: [...state.repos, ...action.payload?.repos],
        page: action.payload?.page || 1,
        pageEnd: action.payload?.repos?.length === 0,
        error: undefined,
      };

    case "setError":
      return {
        ...state,
        error: action.payload?.error,
      };

    case "reset":
      return initialState;

    default:
      throw new Error();
  }
};
