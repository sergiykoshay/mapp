
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
                  {id: 0, main: "", description: "", icon: "04n"}
                ],
                sys: {message: "", country: "", sunrise: 0, sunset: 0}
            },
            
        };
        this.state.position.lat = props.position.lat;
        this.state.position.lon = props.position.lon;
   
    }

   fetchData = async () => {        
      const KEY = 'd735182480adde5eb03094b44670d2fe',
      URL = 'http://api.openweathermap.org/data/2.5',
      lat = this.state.position.lat,
      lon = this.state.position.lon;
      //console.log(lat,lon)
      var url = `${URL}/weather?lat=${lat}&lon=${lon}&APPID=${KEY}&units=metric`;
      //console.log(url);
      this.setState({ isLoading: true });
      return fetch(url)
     
    }
    
  printData = async () => {
      try {
        const data = await this.fetchData()
        const json = await data.json()
        //console.log(json)
        this.setState({ data: json, isLoading: false })
      } catch(e) {
        console.error("Problem", e)
      }
    }    


  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.position!==prevState.position){
      return { position: nextProps.position};
   }
   else return null;
 }
 componentDidMount() {
   this.printData()
 }



 componentDidUpdate(prevProps, prevState) {
   if(prevProps.position!==this.props.position){
     this.setState({position: this.props.position});
     this.printData();
   }
 }



  render() {
    const { isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <div className="lds-dual-ring"></div>;
    }
    console.log( 'ICON===>  ',this.state.data.weather[0].icon )
    return (
      <div className="card">
        <div className = "card__header">
          <h2>{this.state.data.name}</h2>
        </div>
        <div className = "card__main">
          <div className = "col__left">
            <Time value={this.state.UTC} lat={this.state.position.lat} lng={this.state.position.lon} result='all'/>
            <Day currentTime={this.state.UTC}
                    sunrise = {this.state.data.sys.sunrise}
                    sunset = {this.state.data.sys.sunset}  
            />
          </div>
          <div className = "col__right">
            <div>
              <TempConverter tempC = {this.state.data.main.temp} 
                          isCelsius
              />
            </div>
            <div>
              <Arrow style={{ transform: 'rotate(' + this.state.data.wind.deg + 'deg)' }} /> {this.state.data.wind.speed} kmh
            </div>
            {/* <img src={`http://openweathermap.org/img/w/${this.state.data.weather[0].icon}.png`  } alt={this.state.data.weather[0].description} /> */}
            <div>
              <i className= {"owf owf-" + this.state.data.weather[0].id + " owf-4x"}></i>
            </div>
            <div>
              max <TempConverter tempC = {this.state.data.main.temp_max} 
                                  isCelsius
            />
            </div>
            <div>
            min <TempConverter tempC = {this.state.data.main.temp_min}
                                  isCelsius
            />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherCard;