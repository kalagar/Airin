import React, { Component } from "react";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    inputValue: "",
    loading: false
  };

  handleSubmit = e => {
    this.setState({ loading: true });
    e.preventDefault();
    this.getCity(this.state.inputValue);
  };

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="form-group mt-3">
          <input
            value={this.state.inputValue}
            onChange={evt => this.updateInputValue(evt)}
            type="text"
            className="form-control"
          />
        </div>
        <Link
          to={`/search/${this.state.inputValue}`}
          className="btn btn-primary"
          replace
        >
          Search
        </Link>
      </div>
    );
  }
}

export default Search;
