import React, { Component } from "react"

class Day extends React.Component {
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
}

