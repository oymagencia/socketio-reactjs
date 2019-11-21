// Updated. Thanks to: Paul Luna
import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "localhost:4000",
      ancho:1,
      alto:1,
      ///
      color: 'white'
      ///

    };
  }

  setColor = (color) => {
    this.setState({ color })
  }

  componentDidMount = () => {
      const socket = socketIOClient(this.state.endpoint);
      socket.on('interval', (inter) => {
        //  document.body.style.backgroundColor = 'red'
          console.log(inter);
          this.setState({ancho:parseInt(this.state.ancho)+parseInt(inter.ancho),
                         alto:parseInt(this.state.alto)+parseInt(inter.alto)
          })
          //this.setState.ancho(this.ancho+inter.ancho);
         // this.setState.alto(this.alto+inter.alto);
      })
      socket.on('news_by_server', function(data){
        console.log(data);
      });


  }

  render() {
    // testing for socket connections

   // const socket = socketIOClient(this.state.endpoint);

    return (
      <div style={{ textAlign: "center" }}>
        <svg width="100%" height="100%">
          <rect width={this.state.ancho} height={this.state.alto} className="svg" />
        </svg>
      </div>
    )
  }
}
export default App;
