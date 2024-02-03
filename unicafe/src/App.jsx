import { useState } from 'react'

const Button = (props) => (<button onClick={props.handler}>{props.text}</button>)

const Display = (props) => (
  <div>
  <h2>statistics</h2>
  <p>good: {props.good}</p>
  <p>neutral: {props.neutral}</p>
  <p>bad: {props.bad}</p>
  <p>total: {props.total}</p>
  <p>average: {props.average}</p>
  <p>postitive : {props.positive}</p>
  </div>


)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState([])
  const average = score.reduce((accumulator,currentValue) => accumulator + currentValue, 0)/score.length;
  const positiveScore = score.filter(num => num > 0).length;
  const positive = (positiveScore/score.length) * 100



  const handler = (quality, setQuality, scoreValue) => {
    const newQuality = quality +1;
    setQuality(newQuality);
    const newTotal = total +1;
    setTotal(newTotal);
    setScore(score.concat(scoreValue));
    
  }
  
  return (
    <div>
      <h2>give feedback</h2>
      <Button handler={()=>handler(good, setGood, 1)} text="good" />
      <Button handler={()=>handler(neutral, setNeutral, 0)} text="neutral" />
      <Button handler={()=>handler(bad, setBad, -1)} text="bad" />
      <Display good={good} 
               neutral={neutral}
               bad={bad}
               total={total} 
              
               average={average ? average : "No feedback received"} 
               positive={positive ? (positive + " %" ) : "No feedback received"} />
    </div>
  )
}

export default App