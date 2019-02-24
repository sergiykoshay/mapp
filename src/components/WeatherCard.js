
import React from 'react';
import Arrow from '@material-ui/icons/ArrowBackRounded'
import TempConverter  from './TempConverter'
import './loader.css';
import './owfont-regular.css'
import Time from './Time';
import './WeatherCardStyle.css'
import Day from './Day.js'



class WeatherCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            position:{}, 
            expanded: false,
            isLoading: false,
            error: null,
            refresh: this.props.refresh,
            UTC: Date.now(),
            offset:{
              rawOffset: 0
            },
            data: {
                main: {
                    temp: 0,
                    pressure: 0, 
                    humidity: 0, 
                    temp_min: 0, 
                    temp_max: 0
                },
                name: '',
                dt: 0,
                wind: {speed: 0, deg: 0},
                weather: [
                  {id: 0, main: "", description: "", icon: ""}
                ],
                sys: {message: "", country: "", sunrise: 0, sunset: 0}
            },
            
        };
        this.state.position.lat = props.position.lat;
        this.state.position.lon = props.position.lon;
   
    }

        
   loadWeather = () => {
        let KEY = 'd735182480adde5eb03094b44670d2fe',
        URL = 'http://api.openweathermap.org/data/2.5',
        lat = this.state.position.lat,
        lon = this.state.position.lon;

        console.log(lat,lon)
        
        var url = `${URL}/weather?lat=${lat}&lon=${lon}&APPID=${KEY}&units=metric`;
        console.log(url);

        this.setState({ isLoading: true });

        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Something went wrong ...');
            }
          })
          .then(data => this.setState({ data: data, isLoading: false }))
          .catch(error => this.setState({ error, isLoading: false }));
      }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.position!==prevState.position){
      return { position: nextProps.position};
   }
   else return null;
 }
 
 componentDidUpdate(prevProps, prevState) {
   if(prevProps.position!==this.props.position){
     this.setState({position: this.props.position});
     this.loadWeather();
   }
 }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <div className="lds-dual-ring"></div>;
    }
    console.log( 'STATE IN RENDER',this.state.data )
    return (
      <div className="card">
        <h2 className = "card__city">City: {this.state.data.name}</h2>
        <img src={`http://openweathermap.org/img/w/${this.state.data.weather[0].icon}.png`  } alt={this.state.data.weather[0].description} />
        {/* <i className= {"owf owf-" + this.state.data.weather[0].id + "-"+ this.state.nigth + " owf-4x"}></i> */}
        <div className= "cart__time">
           <Time value={this.state.UTC} lat={this.state.position.lat} lng={this.state.position.lon} result='time'/>
           <Time value={this.state.UTC} lat={this.state.position.lat} lng={this.state.position.lon} result='date'/>
          
           <Time value={this.state.UTC} lat={this.state.position.lat} lng={this.state.position.lon} result='day'/>
        </div>
        <Day currentTime={this.state.UTC}
                  sunrise = {this.state.data.sys.sunrise}
                  sunset = {this.state.data.sys.sunset}  
        />
        <div className="card__temp">
          Temp: <TempConverter tempC = {this.state.data.main.temp} 
                      isCelsius
                />
        </div>
        <div>
          WindPower: {this.state.data.wind.speed}
        </div>
        <div>
          <Arrow style={{ transform: 'rotate(' + this.props.direction + 'deg)' }} />
        </div>
        Temperature max: 
              <TempConverter tempC = {this.state.data.main.temp_max} 
                                     isCelsius
              />

            Temperature min:
              <TempConverter tempC = {this.state.data.main.temp_min}
                                     isCelsius
              /> 
      </div>
    );
  }
}



export default WeatherCard;
