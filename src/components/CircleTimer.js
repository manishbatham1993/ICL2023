import React from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too lale...</div>;
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
          isPlaying
          duration={props.duration}
          //colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          colors={['#60d74d', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[25, 15, 5, 0]}
          onComplete={() => [true, 1000]}
          size={80}
          strokeWidth={6}
          onComplete={() => {
                // do your stuff here
                var msg = "Player Unsold";
                if(props.bidHistory.length > 0) {
                    msg = " Player sold to " + props.bidHistory[0].team  + " for " + props.bidHistory[0].bid ;
                }
                return alert(msg);//{ shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
            }}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
  );
}

export default CircleTimer;