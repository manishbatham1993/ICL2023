import { useState, useEffect } from 'react';
function ButtonIncrement(props) {

   return (
     <button className="btn-round" style={{ marginLeft: '.5rem'}} onClick={props.onClickFunc}>
     +
     </button>
   )
}
function ButtonDecrement(props) {

  return (
    <button className="btn-round" style={{ marginLeft: '.5rem'}} onClick={props.onClickFunc}>
    -
    </button>
  )
}
function Display(props) {
  return (
    <label style={{ marginLeft: '.5rem',
    border: "2px solid white",
    borderRadius: "20px",
    height: "30px",
    width: "70px",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "bold",
    lineHeight: "25px"}}  >{props.message}</label>
  );
}
function IncrementDecrement(props) {
  const [counter, setCounter] = useState(props.currentBid);
  const incrementCounter = () => setCounter(counter + 100);
  let decrementCounter = () => setCounter(counter - 100);
  if(counter<=props.currentBid) {
    decrementCounter = () => setCounter(props.currentBid);
  }

  useEffect( () => {
    props.updateNextBid(counter);
  }, [counter]);
  return (
    <div style={{
    margin: "auto",
  width: "50%",
  padding: "10px"}}>
      <ButtonDecrement onClickFunc={decrementCounter}/>
      <Display message={counter}/>
      <ButtonIncrement onClickFunc={incrementCounter}/>

    </div>
  );
}
export default IncrementDecrement;