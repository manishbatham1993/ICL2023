import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EntityContext from '../store/entity-context'

import './countdown.css'

export default function Countdown() {
  const entityCtx = useContext(EntityContext)
  const navigate = useNavigate()

  const COUNTDOWN = entityCtx.configurations.COUNTDOWN
  const auctionStartTimestamp = new Date(COUNTDOWN)
  const [currentTimestamp, setCurrentTimestamp] = useState(Date.now())

  // get total seconds between the times
  var delta =
    auctionStartTimestamp >= currentTimestamp
      ? (auctionStartTimestamp - currentTimestamp) / 1000
      : 0

  // if auction started then redirect to auction page
  if (delta <= 0) {
    delta = 0
    navigate('/auction', { replace: true })
  }

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400)
  delta -= days * 86400

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60

  // what's left is seconds
  var seconds = Math.floor(delta % 60)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Date.now())
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <div>
        {/* <div className="col-md-12"> */}
        <h1 id="header" style={{ fontSize: '100px' }}>
          ICL 2023 Auction Starts
        </h1>
        {/* </div> */}
        <div className="container " style={{ display: 'flex' }}>
          <div className="col-md-3 col-xs-6">
            <div className="clock">
              <div className="well top-pane">
                <div id="days" className="num">
                  {days}
                </div>
              </div>
              <div className="well bottom-pane">
                <div id="days-text" className="text">
                  Days
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-xs-6">
            <div className="clock">
              <div className="well top-pane">
                <div id="hours" className="num">
                  {hours}
                </div>
              </div>
              <div className="well bottom-pane">
                <div id="hours-text" className="text">
                  Hours
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-xs-6">
            <div className="clock">
              <div className="well top-pane">
                <div id="mins" className="num">
                  {minutes}
                </div>
              </div>
              <div className="well bottom-pane">
                <div id="mins-text" className="text">
                  Minutes
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-xs-6">
            <div className="clock">
              <div className="well top-pane">
                <div id="secs" className="num">
                  {seconds}
                </div>
              </div>
              <div className="well bottom-pane">
                <div id="secs-text" className="text">
                  Seconds
                </div>
              </div>
            </div>
          </div>
          <div id="info" className="small"></div>
        </div>
      </div>
    </>
  )
}
