import React, { useContext } from 'react';
import { debounce } from 'lodash';
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
    <div className="col-24">
      <form className="card card-sm">
        <div className="card-body row no-gutters align-items-center">
          <div className="col-auto">
            <i className="fas fa-search h4 text-body"></i>
          </div>
          <div className="col">
            <input
              className="form-control form-control-lg form-control-borderless"
              type="search"
              placeholder="Please input to search GitHub repo"
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;
