import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { GithubContext } from ".";

const initialState = {
  search: "",
  repos: [],
  page: 1,
  pageEnd: false,
  perPage: 10,
  error: undefined,
};

const reducer = (state, action) => {
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

export const ProviderContext = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GithubContext.Provider value={[state, dispatch]}>
      {props.children}
    </GithubContext.Provider>
  );
};

ProviderContext.propTypes = {
  children: PropTypes.object,
};
