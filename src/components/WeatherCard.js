
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RefreshRounded from '@material-ui/icons/RefreshRounded';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Arrow from '@material-ui/icons/ArrowBackRounded'
import TempConverter  from './TempConverter'
import './loader.css';
import './owfont-regular.css'
import Time from './Time';



const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  pos: {
      margin: '10px 8px',
      width: '100%',
      textAlign: 'left',
  }
});

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
            nigth: '',
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
     //Perform some operation here
     this.setState({position: this.props.position});
     this.loadWeather();
     this.getTimeOffset();
   }
 }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  getTimeOffset = () => {
    let url = 'https://maps.googleapis.com/maps/api/timezone/json?location=';
    let key = 'AIzaSyBz9UtX-wlLAqjxqocCUHAStUQhE2Uw2ZY';
    let URL =  `${url}${this.props.position.lat},${this.props.position.lon}&timestamp=${this.state.data.dt}&key=${key}`;
    console.log(URL);
    fetch(URL) 
    .then(res => res.json())
    .then(
      (res) => {
        console.log(res);
        this.setState({offset: res});
      })
  }


  setLocalDate = (d) => {
    const date = new Date(d);
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  setLocalDay = (d) => {
    const date = new Date(d);
    const dayName = [
      "Sunday", "Monday", "Thusday", "Wensday",
      "Thusday", "Friday", "Satuday" 
    ];
    const day = date.getDay();
    return dayName[day];
  }
  
  setTime = (t) => {
    let offset = this.state.offset.rawOffset;
    let newTime = t+offset*1000;
    let time = new Date(newTime)
    let hours = time.getUTCHours();
    let min = time.getUTCMinutes();
    if(hours<10){hours="0" + hours}
    if(min<10){min="0" + min}
    return hours +':'+ min;
  }

  getSun = () => {
    console.log(this.state)
    const dt = this.state.data.dt;
    const ss = this.state.data.sys.sunset;
    const sr = this.state.data.sys.sunrise;
 
        if ( dt > sr && dt <= ss ){
          this.setState(state => ({ nigth: "n" }))
        } else {
          this.setState(state => ({ nigth: "d" }))
        }
  }
       
  

  render() {
    const { classes } = this.props;
    const { isLoading, error } = this.state;
    console.log('day or nigth', this.state.nigth);
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <div className="lds-dual-ring"></div>;
    }
    console.log( 'STATE IN RENDER',this.state.data )
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              <img src={`http://openweathermap.org/img/w/${this.state.data.weather[0].icon}.png`  } alt={this.state.data.weather[0].description} />
            </Avatar>
          }
        />
        <CardContent>
          <Typography className={classes.pos} color="textSecondary">  
              <i className= {"owf owf-" + this.state.data.weather[0].id + "-"+ this.state.nigth + " owf-4x"}></i>
          </Typography>
          <Typography variant="h5" component="h2">
              Today: {this.setLocalDay(this.state.UTC)} 
          </Typography>
          <Typography variant="h4" component="h2">
              City: {this.state.data.name}
          </Typography>
          <Typography component={'div'}>
              Temp: <TempConverter tempC = {this.state.data.main.temp} 
                                    isCelsius
                    />
          </Typography>
              Time: <Time value={this.state.UTC} lat={this.state.position.lat} lng={this.state.position.lon} result='day'/>
 
          <Typography className={classes.pos} color="textSecondary">
              WindPower: {this.state.data.wind.speed}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <Arrow style={{ transform: 'rotate(' + this.props.direction + 'deg)' }} />    
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Reload" onClick={this.loadWeather}>
            <RefreshRounded />
          </IconButton>
          <IconButton aria-label="Share" onClick={this.getSun}>
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography className={classes.pos} color="textSecondary">Humidity:{this.state.data.main.humidity}%</Typography>
            <Typography className={classes.pos} color="textSecondary">Pressure: {this.state.data.main.pressure}</Typography>
            Temperature max: 
              <TempConverter tempC = {this.state.data.main.temp_max} 
                                     isCelsius
              />

            Temperature min:
              <TempConverter tempC = {this.state.data.main.temp_min}
                                     isCelsius
              />  
            <Typography className={classes.pos} color="textSecondary">Id : {this.state.data.weather[0].id}</Typography>
            <Typography className={classes.pos} color="textSecondary">Id : {this.state.data.weather[0].main}</Typography>
            <Typography className={classes.pos} color="textSecondary">Id : {this.state.data.weather[0].description}</Typography>
            <Typography component={'div'} className={classes.pos} color="textSecondary">sunrise : <Time value={this.state.data.sys.sunrise*1000} lat={this.state.position.lat} lng={this.state.position.lon} result='time'/>{this.setTime( this.state.data.sys.sunrise*1000)}</Typography>
            <Typography component={'div'} className={classes.pos} color="textSecondary">sunset : {this.setTime( this.state.data.sys.sunset*1000)}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

WeatherCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeatherCard);
