import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { GithubContext } from ".";
import { reducer, initialState } from "./reducer";

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
