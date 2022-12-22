import react from 'react';
import './countdown.css';
import $ from 'jquery'; 
function timeLeft(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };
  
  $(document).ready(function() {
    var today = new Date();
    var deadline = 'January 1 ' + (today.getFullYear() + 1) + " 00:00:00";
    if (today.getMonth() == 0 && today.getDate() == 1) {
      deadline = 'January 1 ' + (today.getFullYear()) + " 00:00:00";
    };
    
    $("#header").hover(function() {
      $(this).toggleClass('bluelight');
    });
    
    $(".clock").hover(function() {
      $(this).toggleClass('bluelight');
    });
    
    var setClock = function(newyear){
      var timeinterval = setInterval(function(){
        var t = timeLeft(newyear);
        $('#days').text(t.days);
        $('#hours').text(t.hours);
        $('#mins').text(('0' + t.minutes).slice(-2));
        $('#secs').text(('0' + t.seconds).slice(-2));
        if(t.total<=0){
          clearInterval(timeinterval);
          var now = new Date();
          var yearStr = now.getFullYear().toString();
          $('#header').text("ICL 2023 Auction Started");
          $('#days').text(yearStr[0]);
          $('#days-text').text("Happy");
          $('#hours').text(yearStr[1]);
          $('#hours-text').text("New");
          $('#mins').text(yearStr[2]);
          $('#mins-text').text("Year");
          $('#secs').text(yearStr[3]);
          $('#secs-text').text("!!!");
          $('#info').text("Countdown starts again tomorrow!");
        }
      },1000);
    };
    
    setClock(deadline);
    
  });

  export default function Countdown(){

    return(
        <>
        <div class="wrapper">
        {/* <div class="col-md-12"> */}
      <h1 id="header" class="">ICL 2023 Auction Starts</h1>
    {/* </div> */}
  <div class="container " style={{display:'flex'}}>
    
    <div class="col-md-3 col-xs-6">
      <div class="clock">
        <div class="well top-pane">
          <div id="days" class="num">00</div>
        </div>
        <div class="well bottom-pane">
          <div id="days-text" class="text">Days</div>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-xs-6">
      <div class="clock">
        <div class="well top-pane">
          <div id="hours" class="num">00</div>
        </div>
        <div class="well bottom-pane">
          <div id="hours-text" class="text">Hours</div>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-xs-6">
      <div class="clock">
        <div class="well top-pane">
          <div id="mins" class="num">00</div>
        </div>
        <div class="well bottom-pane">
          <div id="mins-text" class="text">Minutes</div>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-xs-6">
      <div class="clock">
        <div class="well top-pane">
          <div id="secs" class="num">00</div>
        </div>
        <div class="well bottom-pane">
          <div id="secs-text" class="text">Seconds</div>
        </div>
      </div>
    </div>
    <div id="info" class="small"></div>
  </div>
  </div>

        </>
    );
  }