import { useState } from 'react'

const Button = (props) => (<button onClick={props.handler}>{props.text}</button>)
const Statistics = (props) => {
  if (props.score.length == 0) {
    return (
      <>
      <p>No feedback has been received</p>
      </>
    )
  }
 {
    return(
      <table>
      <tbody>
      <StatisticLine text="good:" value={props.good}/>
      <StatisticLine text="neutral:" value={props.neutral}/>
      <StatisticLine text="bad:" value={props.bad}/>
      <StatisticLine text="total:" value={props.total}/>
      <StatisticLine text="average:" value={props.average}/>
      <StatisticLine text="positive:" value={props.positive + " %"}/>
      </tbody>
      </table>

    )
  }
}

const StatisticLine =(props) =>{
  return (
    <tr>
      <td>{props.text} </td> 
      <td>{props.value}</td>
    </tr>
    
  )
}



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

    <>
      <h2>give feedback</h2>
      <Button handler={()=>handler(good, setGood, 1)} text="good" />
      <Button handler={()=>handler(neutral, setNeutral, 0)} text="neutral" />
      <Button handler={()=>handler(bad, setBad, -1)} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} 
               neutral={neutral}
               bad={bad}
               total={total}
               score = {score}
              
               average={average} 
               positive={positive} />
    </>
  )
}

export default App