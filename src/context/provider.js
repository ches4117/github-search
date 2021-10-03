import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { GithubContext } from './';

const initialState = {
  search: '',
  repos: [],
  page: 1,
  pageEnd: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setSearch':
      return {
        ...state,
        search: action.payload?.search,
      };

    case 'setRepos':
      return {
        ...state,
        repos: action.payload?.repos,
        page: state.page + 1,
        pageEnd: false,
      };

    case 'setMoreRepos':
      return {
        ...state,
        repos: [...state.repos, ...action.payload?.repos],
        page: state.page + (action.payload?.repos?.length !== 0),
        pageEnd: action.payload?.repos?.length === 0,
      };

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
  children: PropTypes.array,
};
