import React from 'react';

class Time extends React.Component {
    constructor(props){
    this.state = {
        UTC: Date.now(),
        nigth: '',
        offset:{
          rawOffset: 0   
        },
    }
    }

    componentWillMount() {
        this.getTimeOffset()
    }

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
return (
  
)


}
}

export default Time