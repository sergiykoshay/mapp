import React from 'react';

class Time extends React.Component {
    constructor(props){
    super(props);  
    this.state = {
        UTC: Date.now(),
        nigth: '',
        offset:{
          rawOffset: 0   
        },
    }
    }

    componentWillMount() {
        console.log(this.props)
        this.getTimeOffset();
     
    }

    getTimeOffset = () => {
        let url = 'https://maps.googleapis.com/maps/api/timezone/json?location=';
        let key = 'AIzaSyBz9UtX-wlLAqjxqocCUHAStUQhE2Uw2ZY';
        let URL =  `${url}${this.props.lat},${this.props.lng}&timestamp=${this.props.value/100}&key=${key}`;
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
          "Thursday", "Friday", "Satuday" 
        ];
        const day = date.getDay();
        return dayName[day];
      }
      
      setTime = (t) => {
        let offset = this.state.offset.rawOffset;
        console.log(offset);
        if (offset === undefined){offset=0}
        console.log(offset);  
        let newTime = t+offset*1000;
        let time = new Date(newTime)
        let hours = time.getUTCHours();
        let min = time.getUTCMinutes();
        if(hours<10){hours="0" + hours}
        if(min<10){min="0" + min}
        console.log(hours,min)

        return hours +':'+ min;
      }
    

        
render() {
  if(this.props.result==="all"||this.props.result===undefined){
    return (
      <div className="container">
        <div>time: {this.setTime(this.props.value)} </div>
        <div>date: {this.setLocalDate(this.props.value)} </div>
        <div>date: {this.setLocalDay(this.props.value)} </div>
      </div>
    )
  }
  if(this.props.result==="time" ){
    return (
      <div className="container">
        <div>time: {this.setTime(this.props.value)} </div>
      </div>
    )
  }

  if(this.props.result==="day"){
    return (
      <div className="container">
        <div>date: {this.setLocalDay(this.props.value)} </div>
      </div>
    )
  }
  if(this.props.result==="date"){
    return (
      <div className="container">
        <div>date: {this.setLocalDate(this.props.value)} </div>
      </div>
    )
  }
}
}

export default Time;