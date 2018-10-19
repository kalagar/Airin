import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

class WeatherDitails extends Component {
  state = {
    weatherDetails: [],
    loading: false
  };
  async getWeather(woeid) {
    const { data: weatherDetails } = await axios.get(
      "https://www.metaweather.com/api/location/" + woeid
    );
    this.setState(state => {
      return {
        weatherDetails
      };
    });
    this.setState({ loading: false });
  }

  componentDidMount() {
    this.getWeather(this.props.match.params.woeid);
  }

  render() {
    const url = "https://www.metaweather.com/static/img/weather/";
    return (
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Date</th>
            <th>Condition</th>
            <th>visibility</th>
            <th>Wind Speed</th>
            <th>Pressure</th>
            <th>Confidence</th>
            <th>Humidity</th>
            <th>Min</th>
            <th>Max</th>
          </tr>
        </thead>
        <tbody>
          {this.state.weatherDetails.woeid > 0
            ? this.state.weatherDetails.consolidated_weather.map(
                cityDetails => (
                  <tr key={cityDetails.id}>
                    <th scope="row">
                      {moment(cityDetails.applicable_date).format("dddd")}
                    </th>
                    <td>
                      <img
                        style={{ width: "10%", margin: "auto 20px" }}
                        src={url + cityDetails.weather_state_abbr + ".svg"}
                        alt={cityDetails.weather_state_name}
                        className="card-img-top"
                      />
                      <span className="badge badge-danger">
                        {cityDetails.weather_state_name}
                      </span>
                    </td>
                    <td>{Math.round(cityDetails.visibility)} miles</td>
                    <td>
                      {Math.round(cityDetails.wind_speed)}
                      mph
                    </td>
                    <td>
                      {Math.round(cityDetails.air_pressure)}
                      mb
                    </td>
                    <td>{cityDetails.predictability}%</td>
                    <td>{cityDetails.humidity}%</td>
                    <td>
                      <span className="badge badge-info">
                        {Math.round(cityDetails.min_temp)}
                        ºC
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-warning">
                        {Math.round(cityDetails.max_temp)}
                        ºC
                      </span>
                    </td>
                  </tr>
                )
              )
            : null}
        </tbody>
      </table>
    );
  }
}

export default WeatherDitails;
