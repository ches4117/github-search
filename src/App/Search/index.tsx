/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { debounce } from 'lodash';
import { Navbar } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { GithubContext } from '../../context';

function Search() {
  const [, dispatch] = useContext(GithubContext);
  const history = useHistory();
  const { search } = useLocation(); 
  const query = new URLSearchParams(search);
  const locationWord = query.get('word');

  const handleSearchChange = debounce((e) => {
    e.preventDefault();
    dispatch({
      type: 'setSearch',
      payload: { search: e.target.value },
    });
    history.replace(`?word=${e.target.value}`);
  }, 500);

  // use setTimeout to wait history change
  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: 'setSearch',
        payload: { search: locationWord },
      });
    });
  }, []);

  return (
    <Navbar style={{ backgroundColor: '#fff', position: 'sticky' }} fixed="top">
      <input
        defaultValue={locationWord || undefined}
        className="form-control form-control-lg form-control-borderless"
        type="search"
        placeholder="Please input to search GitHub repo"
        onChange={handleSearchChange}
      />
    </Navbar>
  );
}

export default Search;
