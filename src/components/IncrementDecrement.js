import { useState, useEffect } from 'react'
function ButtonIncrement(props) {
  return (
    <button
      className="btn-round plus"
      // style={{ marginLeft: '.5rem' ,width:"25px" }}
      onClick={props.onClickFunc}
    >
      +
    </button>
  )
}
function ButtonDecrement(props) {
  return (
    <button
      className="btn-round minus"
      // style={{ marginLeft: '.5rem' }}
      onClick={props.onClickFunc}
    >
      -
    </button>
  )
}
function Display(props) {
  return (
    <label
      style={{
        marginLeft: '.5rem',
        border: '2px solid white',
        borderRadius: '20px',
        height: '30px',
        width: '140px',
        textAlign: 'center',
        fontSize: '15px',
        fontWeight: 'bold',
        lineHeight: '25px',
        marginRight:'.5rem'
      }}
    >
      {props.message}
    </label>
  )
}
function IncrementDecrement(props) {
  const [counter, setCounter] = useState(props.defaultVal)

  const incrementCounter = () => {
    if (counter + props.defaultChange <= props.maxVal) {
      setCounter(counter + props.defaultChange)
    }
  }
  let decrementCounter = () => {
    if (counter - props.defaultChange >= props.defaultVal) {
      setCounter(counter - props.defaultChange)
    }
  }

  useEffect(() => {
    props.onChange(counter)
  }, [counter])

  useEffect(() => {
    setCounter(props.defaultVal)
  }, [props.defaultVal])

  return (
    <div
      style={{
        margin: 'auto',
        width: '50%',
        // padding: '10px',
        display: 'flex'
      }}
    >
      <ButtonDecrement onClickFunc={decrementCounter} />
      <Display message={counter} />
      <ButtonIncrement onClickFunc={incrementCounter} />
    </div>
  )
}
export default IncrementDecrement
