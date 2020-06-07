import React from 'react';

const bankOne = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  }, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  }, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  }, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];

let typeSound='';


class DrumPad extends React.Component{
  constructor(props){
    super(props);
    this.audio = React.createRef(); 
    this.playAudio = this.playAudio.bind(this);
  }

  playAudio(){
    this.audio.current.play();
    const parent   = this.audio.current.parentNode; 
    typeSound = parent.id;
    parent.style.backgroundColor = "lightblue";
    setTimeout(()=>{
          parent.style.backgroundColor = "gray";
        }, 500);
    typeSound=this.props.id;

  }

  componentDidMount(){
      document.addEventListener("keydown", event=>{
      const keyPressed = event.key.toUpperCase();
      const audio      = document.getElementById(keyPressed); 
      if (audio){
        const parent   = audio.parentNode; 
        typeSound = parent.id;
        parent.style.backgroundColor = "lightblue";
        audio.play();
        setTimeout(()=>{
          parent.style.backgroundColor = "gray";
        }, 500)
      }
    })
  }

  render(){
    return (
        <div className="drum-pad" id={this.props.id} onClick={this.playAudio}>
          <audio ref={this.audio} className='clip' id={this.props.keyTrigger} value={this.props.id} src={this.props.url}></audio>
          {this.props.keyTrigger}
        </div>
      );
  }


}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {typeSound: ''};
  }

  changeSound(){
    this.setState({typeSound:typeSound});
  } 

  render(){
    return (
      <div className="container">
        <div id="display">
            <h1>Type of Sound: {this.state.typeSound}</h1>
        </div>
        <div id="drum-board" onClick={this.changeSound.bind(this)}>
          {bankOne.map(item=>
            <DrumPad id={item.id} keyTrigger={item.keyTrigger} url={item.url}/>
          )}
        </div>
      </div>
    )
  }
}

export default App;
