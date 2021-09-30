import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { GithubContext } from './';

const initialState = {
  search: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setSearch':
      return {
        search: action.payload.search,
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
