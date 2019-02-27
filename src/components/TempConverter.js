
import React from 'react';

class TempConverter extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {isCelsius: true,
                    tempC: props.tempC};
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState(state => ({
        isCelsius: !state.isCelsius
      }));
      if (this.state.isCelsius) {
        let f = this.toFahrenheit(this.state.tempC);
            this.setState(state => ({
              tempC: f
            }));
        console.log('toF',this.state.tempC);
      }
      else{
        let c = this.toCelsius(this.state.tempC);
            this.setState(state => ({
              tempC: c
            }));
      }   
    };  
    
    toCelsius = (F) => {
      return Math.round(((F - 32) * 5 / 9)*100)/100;
    };
    toFahrenheit = (C) => {
      return Math.round(((C * 9 / 5) + 32)*100)/100;
    };
    
  
    render() {
      
      return (
          <span onClick={this.handleClick}
               className = 'temp'>
            {this.state.tempC} &deg;
            {this.state.isCelsius ? 'C' : 'F'}
          </span>
      );
    }
  }
  
export default TempConverter