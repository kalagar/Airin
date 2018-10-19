import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";

import Spinner from "./common/Spinner";
import "./Weather.css";

class Weather extends Component {
  state = {
    todayWeather: [],
    weatherDetails: [],
    loading: false
  };

  // get city WOEID based on location's name
  getCityWoeid = cityName => {
    this.setState({ loading: true });
    axios
      .get("https://www.metaweather.com/api/location/search/?query=" + cityName)
      .then(response => {
        console.log(response.data[0].woeid);
        this.setState(state => {
          return { woeid: response.data[0].woeid };
        });
        this.getWeather(response.data[0].woeid);
      })
      .catch(error => {
        toast.error("No results were found. Try changing the keyword!");
        this.setState({ loading: false });
      });
  };

  //get weather details based on WOEID
  async getWeather(woeid) {
    const { data: weatherDetails } = await axios.get(
      "https://www.metaweather.com/api/location/" + woeid
    );
    this.setState(state => {
      return {
        weatherDetails,
        todayWeather: weatherDetails.consolidated_weather[0]
      };
    });
    this.setState({ loading: false });
  }

  // get city weather details based on LINK params after component has been load
  componentDidMount() {
    if (this.props.match !== undefined) {
      this.getCityWoeid(this.props.match.params.keyword);
    } else {
      this.getCityWoeid(this.props.weatherDetails.title);
    }
  }

  // handle search new value
  componentWillReceiveProps(nextProps) {
    if (nextProps.match) {
      this.getCityWoeid(nextProps.match.params.keyword);
    }
  }

  render() {
    const url = "https://www.metaweather.com/static/img/weather/png/";
    let weatherC = (
      <React.Fragment>
        {this.state.weatherDetails.woeid > 0 ? (
          <div className="col-md-3 mt-5 carD card">
            <img
              style={{ width: "30%", margin: "20px auto" }}
              src={
                this.state.weatherDetails.woeid > 0
                  ? url + this.state.todayWeather.weather_state_abbr + ".png"
                  : null
              }
              alt={this.state.todayWeather.weather_state_name}
              className="card-img-top"
            />
            <div className="card-body" style={{ textAlign: "center" }}>
              <Link
                to={`/weather/${this.state.weatherDetails.woeid}`}
                className="card-title btn btn-danger"
              >
                {this.state.weatherDetails.title}
              </Link>
              <p className="card-text">
                <span className="badge badge-dark">
                  {this.state.todayWeather.weather_state_name}
                </span>
              </p>
              <p>
                Now :{" "}
                <span className="badge badge-success">
                  {Math.round(this.state.todayWeather.the_temp)}
                  ºC
                </span>
              </p>
            </div>
            <div className="card-footer">
              <small className="text-muted">
                Min Temp :{" "}
                <span className="badge badge-info">
                  {Math.round(this.state.todayWeather.min_temp)}
                  ºC
                </span>
              </small>
              <br />
              <small className="text-muted">
                Max Temp :{" "}
                <span className="badge badge-warning">
                  {Math.round(this.state.todayWeather.max_temp)}
                  ºC
                </span>
              </small>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
    if (this.state.loading) {
      weatherC = <Spinner />;
    }

    return <React.Fragment>{weatherC}</React.Fragment>;
  }
}

export default Weather;
