import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Loading...</div>
  }

  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  )
}

function CircleTimer(props) {
  return (
    <div
      className="timer-wrapper"
      style={{
        margin: 'auto',
        width: '31%',
        padding: '10px',
      }}
    >
      <CountdownCircleTimer
        // isPlaying
        duration={props.duration}
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
  )
}

export default CircleTimer
