import { useState } from 'react'

const Button = (props) => (<button onClick={props.handler}>{props.text}</button>)

const Display = (props) => (
  <div>
  <h2>statistics</h2>
  <p>good: {props.good}</p>
  <p>neutral: {props.neutral}</p>
  <p>bad: {props.bad}</p>
  </div>


)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handler = (quality, setQuality) => {
    const newQuality = quality +1;
    setQuality(newQuality);
    console.log(newQuality)
  }
  
  return (
    <div>
      <h2>give feedback</h2>
      <Button handler={()=>handler(good, setGood)} text="good" />
      <Button handler={()=>handler(neutral, setNeutral)} text="neutral" />
      <Button handler={()=>handler(bad, setBad)} text="bad" />
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App