import React from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

//import "./styles.css";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Player Sold</div>;
  }

  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
};

function CircleTimer(props) {
  return (
      <div className="timer-wrapper" style={{
    margin: "auto",
  width: "31%",
  padding: "10px"}}>
        <CountdownCircleTimer
          // isPlaying
          duration={props.duration}
          //colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          colors={['#60d74d', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[25, 15, 5, 0]}
          onComplete={() => ({ shouldRepeat: true })}

          size={100}
          strokeWidth={10}

          isSmoothColorTransition={true}
          
        >
          {renderTime}  
        </CountdownCircleTimer>
      </div>
  );
}

export default CircleTimer;