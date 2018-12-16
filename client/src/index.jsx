import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Search from "./components/Search.jsx";
import RepoList from "./components/RepoList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    };
    this.loadTop25 = this.loadTop25.bind(this);
  }
  //make ajax call to github API
  //set state to save the search term for api query
  search(term) {
    console.log(`${term} was searched`);
    // TODO : fetch latest saved repos from db after server queries API in success callback

    //need to convert search term to object and send to server for API query
    $.ajax({
      url: "/repos",
      method: "POST",
      data: { term },
      success: data => {
        console.log(data, "success DATA ajax!");
        this.loadTop25();
      }
    });
  }

  //TODO - get from server-> db to update state repos
  //
  loadTop25() {
    $.ajax({
      url: '/repos',
      method: 'GET',
      success: (data) => {
        data = JSON.parse(data);
        // console.log(Array.isArray(data), "parsed client top 25 ajax")
        this.setState({
          repos: data,
        });
      }
    });
  }

  componentDidMount() {
    this.loadTop25();
  }

  render() {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <div className="container">
          <RepoList repos={this.state.repos} />
          <Search onSearch={this.search.bind(this)} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
