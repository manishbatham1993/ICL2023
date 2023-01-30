import React from 'react'
import './rules.css'
export default function Rules() {
  return (
    <div>
      <div
        style={{
          backgroundColor: '#eee',
          textAlign: 'center',
          paddingBottom: '25px',
        }}
      >
        <img src="static/rules_img/ICL_Logo.svg" style={{ height: '200px' }} />
      </div>
      <div style={{ backgroundColor: '#1c3663' }}>
        <div className="container">
          <div className="row match-rule">
            <h5
              style={{
                fontSize: '30px',
                fontWeight: 'bold',
                marginTop: '30px',
                marginBottom: '20px',
                marginLeft: '35%',
              }}
            >
              TOURNAMENT RULES
            </h5>
          </div>

          <div className="card-div t-text" style={{ display: 'flex' }}>
            <img src="static/rules_img/umpire.png" />
            <div
              className="div-text"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              Umpire decision will be the final. If player/team argues with
              umpire then warning will be given for first incident and for
              subsequent incidents 5 runs penalty will be applied for each
              incident.
            </div>
          </div>
          <div
            className="card-div t-text div-text"
            style={{ marginTop: '10px', textAlign: 'inherit' }}
          >
            <img src="static/rules_img/bat.png" />
            Bats will be provided. You are welcomed to bring your own bat.
          </div>
          <div
            className="card-div t-text"
            style={{ marginTop: '10px', display: 'flex' }}
          >
            <img src="static/rules_img/timer.png" />
            <div
              className="div-text"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: '6px',
              }}
            >
              Teams must arrive 15 minutes before scheduled time. If team
              reaches after scheduled time but within 10 mins window then overs
              will be deducted for their inning. e.g. scheduled time is 9:00 AM
              and team arrives at 9:05 AM then over will be reduced for that
              team.If team reaches after 10 minutes from scheduled time then BYE
              will be given to the other team.
            </div>
          </div>
          <div
            className="card-div t-text"
            style={{ marginTop: '10px', display: 'flex' }}
          >
            <img src="static/rules_img/groups1.png" />
            <div
              className="div-text"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: '6px',
              }}
            >
              If required players are not available in playing team, then team
              can decide whether to play with available players or give bye to
              opponent team.
            </div>
          </div>
          <div
            className="card-div t-text  "
            style={{ marginTop: '10px', display: 'flex' }}
          >
            <img src="static/rules_img/equality.png" />
            <div
              className="div-text"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: '6px',
              }}
            >
              If tie happens, super over will decide the winner. Even after
              super over, tie remains, one more super over will be played. Still
              tie remains, number of boundaries will decide the winner.
            </div>
          </div>
          <div
            className="card-div t-text"
            style={{ marginTop: '10px', display: 'flex' }}
          >
            <img src="static/rules_img/no-food.png" />
            <div
              className="div-text"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: '6px',
              }}
            >
              Water will be available at the ground. Refreshment can be
              purchased from the canteen at your own cost.
            </div>
          </div>
          <div
            className="row match-rule"
            style={{ marginTop: '20px', marginLeft: '40%' }}
          >
            <h5 style={{ fontSize: '30px', fontWeight: 'bold' }}>
              MATCH RULES
            </h5>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="card-div" style={{ marginTop: '20px' }}>
                <div>
                  <div style={{ float: 'left' }}>
                    <img src="static/rules_img/batting.png" />
                  </div>
                  <div>
                    <h3 className="card-head">BATTING</h3>
                  </div>
                </div>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px !important',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Each player must play at least one bowl.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  If all players are not given chance to bat, team will be
                  disqualified.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  You can retire players, so others can bat.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Retired players can retrun to bat once all players gets their
                  chance to bat.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  If all non-striker batsman gets out, then last man standing
                  can play the remaining overs.
                </p>
              </div>
              <div className="card-div" style={{ marginTop: '20px' }}>
                <div>
                  <div style={{ float: 'left' }}>
                    <img src="static/rules_img/catch.png" />
                  </div>
                  <div>
                    <h3 className="card-head">CATCH</h3>
                  </div>
                </div>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Only direct catch without touching any net will be considered
                  as out.
                </p>
              </div>
              <div className="card-div" style={{ marginTop: '20px' }}>
                <div>
                  <div style={{ float: 'left' }}>
                    <img src="static/rules_img/deadball.png" />
                  </div>
                  <div>
                    <h3 className="card-head">DEAD BALL</h3>
                  </div>
                </div>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  If ball bounce twice before reaching to batsman, ball will be
                  considered as dead ball.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  If batsman hits dead ball, then runs will be allowed.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  No extra run for dead ball.
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card-div" style={{ marginTop: '20px' }}>
                <div>
                  <div style={{ float: 'left' }}>
                    <img src="static/rules_img/bowling.png" />
                  </div>
                  <div>
                    <h3 className="card-head">BOWLING</h3>
                  </div>
                </div>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />8 overs to be
                  bowled in an inning.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />6 players must
                  bowl from 7 players.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Only 2 bowlers can bowl max 2 overs.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  It is mandatory to finish 8 overs in 20 minutes else 5 runs
                  per over penalty will be applicable.
                </p>
              </div>
              <div className="card-div" style={{ marginTop: '20px' }}>
                <div>
                  <div style={{ float: 'left' }}>
                    <img src="static/rules_img/wicket.png" />
                  </div>
                  <div>
                    <h3 className="card-head">WICKETS</h3>
                  </div>
                </div>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  No LBW wicket applicable.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  In case of wicket, new batsman has to take the strike, except
                  in run out case. (As per the new ICC rule)
                </p>
              </div>
              <div className="card-div" style={{ marginTop: '20px' }}>
                <div>
                  <div style={{ float: 'left' }}>
                    <img src="static/rules_img/extra.png" />
                  </div>
                  <div>
                    <h3 className="card-head">EXTRAS</h3>
                  </div>
                </div>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  WIDE ball.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  NO ball.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  No leg byes/byes will be allowed.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Over throw runs are allowed.
                </p>
              </div>
              <div className="card-div" style={{ marginTop: '20px' }}>
                <div>
                  <div style={{ float: 'left' }}>
                    <img src="static/rules_img/ball.png" />
                  </div>
                  <div>
                    <h3 className="card-head">NO BALL</h3>
                  </div>
                </div>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Full toss above waist height.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Bouncer above shoulder.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Not following bowling position.
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card-div" style={{ marginTop: '20px' }}>
                <div>
                  <div style={{ float: 'left' }}>
                    <img src="static/rules_img/ballposition.png" />
                  </div>
                  <div>
                    <h3 className="card-head">BOWLING POSITION</h3>
                  </div>
                </div>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Bowling position will be throw ball only.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Both legs should be within the box.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Both heels must touch the ground while throwing the ball.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Not following above rules will be considered as NO BALL.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Committee will show the valid bowling position before start of
                  the match.
                </p>
              </div>
              <div className="card-div" style={{ marginTop: '20px' }}>
                <div>
                  <div style={{ float: 'left' }}>
                    <img src="static/rules_img/four.png" />
                  </div>
                  <div>
                    <h3 className="card-head">FOURS</h3>
                  </div>
                </div>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Boundary will be considered, only if the ball touches the
                  straight net.
                </p>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  If ball touches adjacent nets or roof net and later touches
                  the straight net then also it will be considered as boundary.
                </p>
              </div>
              <div className="card-div" style={{ marginTop: '20px' }}>
                <div>
                  <div style={{ float: 'left' }}>
                    <img src="static/rules_img/six.png" />
                  </div>
                  <div>
                    <h3 className="card-head">SIXES</h3>
                  </div>
                </div>
                <p
                  className="p-text"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#1C3663',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src="static/rules_img/chevron-right.svg" />
                  Sixes will be straight net only without touching any adjacent
                  or roof net.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
