// import { Octokit } from "@octokit/core";

function Search() {
  // const fetchRepo = async () => {
  //   await octokit.request('GET /search/commits', {
  //     q: 'q',
  //     mediaType: {
  //       previews: [
  //         'cloak'
  //       ]
  //     }
  //   })
  // }
  // const handleSearch = () => {

  // }
  // fetchRepo()
  return (
    <div className="col-24">
      <form className="card card-sm">
        <div className="card-body row no-gutters align-items-center">
          <div className="col-auto">
            <i className="fas fa-search h4 text-body"></i>
          </div>
          <div className="col">
            <input className="form-control form-control-lg form-control-borderless" type="search" placeholder="Search topics or keywords" />
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
