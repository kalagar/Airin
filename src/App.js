import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Home from "./components/Home";
import WeatherDitails from "./components/WeatherDetails";
import Weather from "./components/Weather";
import Search from "./components/Search";

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <ToastContainer position="top-left" />
        <Search />
        <div className="content">
          <Switch>
            <Route path="/weather/:woeid" component={WeatherDitails} />
            <Route
              path="/search/:keyword"
              render={props => <Weather {...props} />}
            />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
