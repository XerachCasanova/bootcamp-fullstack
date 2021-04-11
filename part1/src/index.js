import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {

  return (
    <div>
      
      <p>Hola {props.name}, tienes {props.age} años</p>

    </div>

  )

}

const App = () => {
  const name ='Peter'
  const age = 10
  return (

    <>
      <h1>Saludos!</h1>
      <Hello name="Xerach" age= {26+10} />
      <Hello name={name} age={age+15}/>
      <Footer />
    </>

  )

}

const Footer = () => {

  return (
    <div>
      Saludos desde el pie de página
    </div>

  )

}

ReactDOM.render(<App />, document.getElementById('root')) 