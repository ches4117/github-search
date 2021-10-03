import React, { useContext } from 'react';
import { debounce } from 'lodash';
import { Navbar } from 'react-bootstrap';
import { GithubContext } from '../../context';

function Search() {
  const [, dispatch] = useContext(GithubContext);
  const handleSearchChange = debounce((e) => {
    e.preventDefault();
    dispatch({
      type: 'setSearch',
      payload: { search: e.target.value },
    });
  }, 500);

  return (
    <Navbar style={{ backgroundColor: '#fff', position: 'sticky' }} fixed="top">
      <input
        className="form-control form-control-lg form-control-borderless"
        type="search"
        placeholder="Please input to search GitHub repo"
        onChange={handleSearchChange}
      />
    </Navbar>
  );
}

export default Search;
