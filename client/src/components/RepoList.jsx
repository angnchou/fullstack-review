import React from "react";


//map over repos data from server's GET, href for url and username for repoList
//array of objects
const RepoList = props => {
  const showRepo = props.repos.map((repo, index) => {
    return (
      <tr key={index}>
        <td ><a href={repo.url} target="_blank">{repo.name}</a></td>
        <td>{repo.stars}</td>
      </tr>
    )
  });

  return (
    <div>
      <h4> Repo List </h4>
      These are the top {props.repos.length} most starred repos!
    <table>
        <tbody>
          <tr><th>{"User / Repo"}</th><th>{"Stars"}</th></tr>
          {showRepo}
        </tbody>
      </table>
    </div >
  );
}

export default RepoList;
