import React from 'react';
import './App.css'
import {useState} from 'react';
const sounds = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
  keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
]; 
const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

function App(){
const [volume,setVolume]=useState(1);
let [recording,setRecording]=useState("")
const [bank,setBank]=useState(true)


const playRecording=()=>{
  let index=0;
  const recordArray=recording.split('')
  // as in recording we are getting all letters as in setRecording((prev)=>prev+clips.keyTrigger) was passed 
  // so using split('') so we get array
//  setInterval() is function that calls itself after every 600 ms 
  const interval=setInterval(()=>{
  const audioTag=document.getElementById(recordArray[index])
  audioTag.play()
  audioTag.volume=volume
  index++
},600)
// settitng timeout is necessary else setInterval gets calling Infinity
setTimeout(()=>clearInterval(interval),600*recordArray.length)

  
}

let padBank;
// if true play sounds object else play bankTwo object initially its true sounds is default
  if(bank){
    padBank=sounds.map((item,index)=><DrumMachine key={index} clips={item} setRecording={setRecording} volume={volume}/>)
  }else{
     padBank=bankTwo.map((item,index)=><DrumMachine key={index} clips={item} setRecording={setRecording} volume={volume}/>)
     
  }
  let change
 if(bank){
  //  if bank is true this part gets displays and here onclick we set bank to false by setBank(false) so the false statements executes
    change=<div className="control">
      <p>Heater Kit</p>
      <div className="select">
        <div onClick={()=>setBank(false)} className="inner"></div>
      </div>
    </div>
 }else{
   change=
   <div className="control">
      <p>Piano Kit</p>
      <div className="select">
        <div onClick={()=>setBank(true)} style={{float:"right"}} className="inner"></div>
      </div>
    </div>
 }
 let lyrics
//  regex is to limit letters entered to display 1-84 letters can be entered which will be displayed 
let regex=/^[A-Z]{1,84}$/g

 if(regex.test(recording)){
   lyrics=<div className="displayMax">{recording}</div>
 }

    return(
    
      <div className="container">
      <div className="display">
      {padBank}
      
    <div className="bank">{change}</div>
    
      <div className="record">
      <div>{lyrics}</div>
      <input type="range" max="1" min="0" step="0.01" value={volume} onChange={(e)=>setVolume(e.target.value)}/>
      
      {recording && (<div className="d-flex align-items-center justify-content-around">
        <button onClick={playRecording} className="btnOne">Play</button>
        <button onClick={()=>setRecording("")} className="btnTwo">Delete</button>
      </div>)}
      </div>
      </div>
      </div>
     
    )  
}

const DrumMachine =({clips,volume,setRecording})=>{
  React.useEffect(()=>{
    document.addEventListener("keydown",handleChange)
    // keydown is event that have info in it for every key on keyboard particular keyCode is also stored in it
    return()=>{
      document.removeEventListener("keydown",handleChange)
    }
  })
  const handleChange=(e)=>{
      if(e.keyCode===clips.keyCode){
        // only that particular object whose keyCode matches with keyCode of our object that gets passed here and playSound is called
        playSound()
      }
  }
  
  const playSound=()=>{
  //  onclick or keydown event of any object (Q,W,E..) here audio of that particular object gets triggered as clips.keyTrigger get passed in and that audio plays
    const audioTag=document.getElementById(clips.keyTrigger)
    
    audioTag.play()
    audioTag.volume=volume;
    // to display key pressed prev=>so that previously pressed keys also gets displayed
    setRecording((prev)=>prev+clips.keyTrigger)
    
  }

  
  return(
  //  for each object in array we get <div> like
  //   <div id="Q">Q <audio id="Q" src="https://"></div>
  // <div id="W">W <audio id="W" src="https://"></div>
    <div id={clips.id} onClick={playSound} className="drum-pad">
      {clips.keyTrigger}
     <audio id={clips.keyTrigger} src={clips.url}/>
     
    </div>
  )
}

export default App