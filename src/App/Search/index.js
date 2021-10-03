import React, { useContext } from 'react';
import { debounce } from 'lodash';
import { GithubContext } from '../../context';
import { octokit } from '../../utils';

function Search() {
  const [, dispatch] = useContext(GithubContext);

  const fetchRepo = async (search) => {
    const result = await octokit.request('GET /search/repositories', {
      q: search,
      per_page: 10,
      page: 1,
    });

    if (result) {
      const repos = result.data.items;
      dispatch({
        type: 'setSearch',
        payload: { search },
      });

      dispatch({
        type: 'setRepos',
        payload: { repos },
      });
    }
  };

  const handleSearchChange = debounce((e) => fetchRepo(e.target.value), 500);

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
