import React from "react"

class Day extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentTime: this.props.currentTime,
        sunset: this.props.sunset,
        sunrise: this.props.sunrise,
        nigth: ""

      }
    }
    componentDidMount() {
      this.getSun();
      // console.log("Day state =>",this.state)
    }

    getSun = () => {
        // console.log(this.state)
        const dt = this.state.currentTime;
        const ss = this.state.sunset*1000;
        const sr = this.state.sunrise*1000;
        // console.log("sunset =>", ss, 'sunrise =>', sr)
     
            if ( dt > sr && dt <= ss ){
              this.setState(state => ({ nigth: "d" }))
            } else {
              this.setState(state => ({ nigth: "n" }))
            }
        
      }

      render() {
        if(this.state.nigth === "n"){
          return (
            <div>Nigth</div>
          )
        }
        if(this.state.nigth === "d"){
          return (
            <div>Day</div>
          )
        }
        else {
          return (
            <div>some error!!!!</div>
          )
        }
      }
}

export default Day;

