import React, { Component } from "react";
import axios from "axios";
import Spinner from "./common/Spinner";
import Weather from "./Weather";

class Home extends Component {
  state = {
    cities: [
      { id: 1, value: "Istanbul", woeid: "2344116" },
      { id: 2, value: "Berlin", woeid: "638242" },
      { id: 3, value: "London", woeid: "44418" },
      { id: 4, value: "Helsinki", woeid: "565346" },
      { id: 5, value: "Dublin", woeid: "560743" },
      { id: 6, value: "Vancouver", woeid: "9807" }
    ],
    allCitiesDetails: [],
    loading: false
  };

  /* after component has been mount call metaweather api 6 times for 6 cities
     with Promise and put result to an array in state 
  */
  componentDidMount() {
    this.setState({ loading: true });
    const getWeatherFromWoeid = woeid =>
      axios.get(`https://www.metaweather.com/api/location/${woeid}`);

    const p1 = getWeatherFromWoeid(this.state.cities[0].woeid);
    const p2 = getWeatherFromWoeid(this.state.cities[1].woeid);
    const p3 = getWeatherFromWoeid(this.state.cities[2].woeid);
    const p4 = getWeatherFromWoeid(this.state.cities[3].woeid);
    const p5 = getWeatherFromWoeid(this.state.cities[4].woeid);
    const p6 = getWeatherFromWoeid(this.state.cities[5].woeid);

    Promise.all([p1, p2, p3, p4, p5, p6])
      .then(result => {
        const allCitiesDetails = {
          result
        };
        this.setState({ allCitiesDetails });
        this.setState({ loading: false });
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    let weatherC = (
      <div className="card-deck">
        {this.state.allCitiesDetails.result
          ? this.state.allCitiesDetails.result.map(cityDetails => (
              <Weather
                key={cityDetails.data.woeid}
                weatherDetails={cityDetails.data}
                todayWeather={cityDetails.data.consolidated_weather[0]}
              />
            ))
          : null}
      </div>
    );
    if (this.state.loading) {
      weatherC = <Spinner />;
    }
    return <React.Fragment>{weatherC}</React.Fragment>;
  }
}

export default Home;
