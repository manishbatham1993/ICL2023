import react from 'react'
import './countdown.css'
import $ from 'jquery'
function timeLeft(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date())
  var seconds = Math.floor((t / 1000) % 60)
  var minutes = Math.floor((t / 1000 / 60) % 60)
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24)
  var days = Math.floor(t / (1000 * 60 * 60 * 24))
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  }
}

$(document).ready(function () {
  var today = new Date()
  var deadline = 'January 1 ' + (today.getFullYear() + 1) + ' 00:00:00'
  if (today.getMonth() == 0 && today.getDate() == 1) {
    deadline = 'January 15 ' + today.getFullYear() + ' 00:00:00'
  }

  $('#header').hover(function () {
    $(this).toggleclassName('bluelight')
  })

  $('.clock').hover(function () {
    $(this).toggleclassName('bluelight')
  })

  var setClock = function (newyear) {
    var timeinterval = setInterval(function () {
      var t = timeLeft(newyear)
      $('#days').text(t.days)
      $('#hours').text(t.hours)
      $('#mins').text(('0' + t.minutes).slice(-2))
      $('#secs').text(('0' + t.seconds).slice(-2))
      if (t.total <= 0) {
        clearInterval(timeinterval)
        var now = new Date()
        var yearStr = now.getFullYear().toString()
        $('#header').text('ICL 2023 Auction Started')
        $('#days').text(yearStr[0])
        $('#days-text').text('Happy')
        $('#hours').text(yearStr[1])
        $('#hours-text').text('New')
        $('#mins').text(yearStr[2])
        $('#mins-text').text('Year')
        $('#secs').text(yearStr[3])
        $('#secs-text').text('!!!')
        $('#info').text('Countdown starts again tomorrow!')
      }
    }, 1000)
  }

  setClock(deadline)
})

export default function Countdown() {
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
                  00
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
                  00
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
                  00
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
                  00
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
