import { useState } from 'react'

const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return (
      <div> 
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value = {good} />
          <StatisticLine text="neutral" value = {neutral} />
          <StatisticLine text="bad" value = {bad} />
          <StatisticLine text="all" value = {all} />
          <StatisticLine text="average" value = {(good - bad) / all} />
          <StatisticLine text="positive" value = {(good / all) * 100 + " %"} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Title = ({ text }) => <h1>{text}</h1>;

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const setToGood = (newValue) => {
    setGood(newValue)
  }

  const setToNeutral = (newValue) => {
    setNeutral(newValue)
  }

  const setToBad = (newValue) => {
    setBad(newValue)
  }


  return (
    <div>
      <Title text = "give feedback" />
      <Button onClick={() => setToGood(good + 1)} text = "good" />
      <Button onClick={() => setToNeutral(neutral + 1)} text = "neutral" />
      <Button onClick={() => setToBad(bad + 1)} text = "bad" />
      <Title text = "statistics" />
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {good + neutral + bad} />
    </div>
  )
}

export default App