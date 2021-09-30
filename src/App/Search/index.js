import React, { useContext } from 'react'
import { Octokit } from "@octokit/core";
import { GithubContext } from '../../context'

function Search() {
  const [state, dispatch] = useContext(GithubContext)
  console.log(state)
  const fetchRepo = async () => {
    const result = await octokit.request('GET /search/repositories', {
      q: 'q',
    })
    if (result) {
      const repositories = result.data.items
      console.log(repositories)
    }
  }

  const handleSearchChange = (search) => {
    dispatch({
      type: 'setSearch',
      payload: { search }
    })
  }

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
              onChange={e => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-lg btn-success" type="submit">Search</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;
