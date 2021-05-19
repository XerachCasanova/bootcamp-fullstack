import React, { useState } from 'react';
import ReactDOM from 'react-dom';



const Button = ({onClick, text}) => {

  return (
    <button onClick = {onClick}>{text}</button>
  )

}

const History = (props) =>{

  if (props.allClicks.length===0){

    return(
      <div>
        The app is used by pressing the buttons
      </div>
    )

  }
  return (
    <div>
      Button press history: {props.allClicks.join(' ')}
    </div>


  )

}


const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () =>{
    setAll(allClicks.concat('L'))
    setLeft(left+1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right+1)
  }
  return (
    <div>
      {left}
      <button onClick={handleLeftClick} >left</button>
      <button onClick={handleRightClick} >right</button>
      {right}
      <History allClicks = {allClicks} />
    
    </div>
    
  )
}

let counter = 1


  ReactDOM.render(
    <App />, 
    document.getElementById('root')
  )

