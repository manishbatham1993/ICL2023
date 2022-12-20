import {React, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

import IncrementDecrement from "./IncrementDecrement";
import CircleTimer from "./CircleTimer";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  CardText,
  CardFooter,
  Badge,
  Progress
} from "reactstrap";


const teamList = [
    {team : 'FF', iconClass : 'profileImage_sky'},
    {team : 'FSK', iconClass : 'profileImage_red'},
    {team : 'FKR', iconClass : 'profileImage_pink'},
    {team : 'FL', iconClass : 'profileImage_blue'}

];

function Dashboard(props) {
    const [baseBid, setBaseBid] = useState(5000);
    const [currentBid, setCurrentBid] = useState(5000);
    const [nextBid, setNextBid] = useState(5100);
    const updateNextBid = bid => {
        setNextBid(bid);
    }

    const [bidHistory, setBidHistory] = useState([]);
    const [countDownTime, setCountDownTime] = useState(30);

    const [randomNumber, setRandomNumber] = useState(0)

    const generateRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * teamList.length);
        setRandomNumber(randomNumber)
    }

    const addBidHistory = () => {
        if (currentBid != nextBid) {
            const id = bidHistory.length + 1;
            setBidHistory((prev) => [
                 {
                    id: id,
                    team: teamList[randomNumber].team, // will need to take it from socket.io
                    iconClass : teamList[randomNumber].iconClass,
                    bid: nextBid,
                  },
                  ...prev
            ]);
            setCurrentBid(nextBid);
            setCountDownTime(30);
            generateRandomNumber();
        } else {
            alert("Please increase price to bid");
        }
    };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("../assets/img/Srikant.jpg")}
                    />
                    <h5 className="title">CURRENT BID FOR</h5>
                  </a>
                  <p className="description text-info">Srikant Naidu</p>
                </div>
                <div className="card-description" style={{
    margin: "auto",
  width: "80%",
  padding: "10px"}}>
                  <Button color="primary" className="animation-on-hover">
                  Bat
                  </Button>
                  <Button color="success" className="animation-on-hover">
                  8
                  </Button>
                </div>
              </CardBody>
                    <h3 className="text-center">Base Price
                    <span className="text-success"> :  {baseBid}</span>
                    </h3>

            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h1" className="text-center">
                  <i className="tim-icons icon-money-coins text-primary" />{" "}
                  {currentBid}
                </CardTitle>
                <p className="text-center"> CURRENT BID </p>
              </CardHeader>
              <CardBody>

                  <p className="text-center">{bidHistory.length > 0 ? bidHistory[0].team + " - Raised for " + currentBid : ""}   </p>

                  <IncrementDecrement currentBid={currentBid} updateNextBid={updateNextBid}/>

                  <CircleTimer duration={countDownTime} bidHistory={bidHistory}/>



                  <div className="pad10 mar10">
                    <Button color="info" className="animation-on-hover btn-block"
                        onClick={() => addBidHistory()}>
                            BID {nextBid}
                    </Button>
                  </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h4" className="text-center">
                Bid history for Srikant Naidu</CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
                    <tbody>
                        {bidHistory.map((todo) => {
                            return(
                            <tr>
                                <td>
                                    <span className={todo.iconClass}>{todo.team}</span>
                                        - raised for {todo.bid}
                                </td>
                            </tr>
                            );
                            })}
                      </tbody>
                      </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <CardTitle tag="h4">Previously Auctioned</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          Vipil Sawalwade
                          <p>SOLD TO FF</p>
                        </td>
                        <td>
                            SOLD FOR
                            <p>7000</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Neeraj Gupta
                          <p>SOLD TO FSK</p>
                        </td>
                        <td>
                            SOLD FOR
                            <p>5500</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Rahul Aggrawal
                          <p>SOLD TO FKR</p>
                        </td>
                        <td>
                            SOLD FOR
                            <p>6000</p>
                        </td>
                      </tr>

                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="8" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4" className="text-center">Team Overview</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                    <Col lg="6" md="12">
                    <CardTitle tag="h3" className="text-center">Fortra Fighters</CardTitle>
                    <p className="text-info text-center">Fund Remaining</p>
                    <Button color="info" className="animation-on-hover">
                  40,000
                  </Button>
                  <p className="text-primary text-center">Total Players</p>
                  <Button color="primary" className="animation-on-hover">
                  5/11
                  </Button>
                    </Col>
                    <Col lg="6" md="12">
                    <CardTitle tag="h3" className="text-center">Fortra Super Kings</CardTitle>
                    <p className="text-info text-center">Fund Remaining</p>
                    <Button color="info" className="animation-on-hover">
                  35,000
                  </Button>
                  <p className="text-primary text-center">Total Players</p>
                  <Button color="primary" className="animation-on-hover">
                  6/11
                  </Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6" md="12" style={{borderColor : 'pink'}}>
                    <CardTitle tag="h3" className="text-center">Fortra Knight Riders</CardTitle>
                    <p className="text-info text-center">Fund Remaining</p>
                    <Button color="info" className="animation-on-hover">
                  20,000
                  </Button>
                  <p className="text-primary text-center">Total Players</p>
                  <Button color="primary" className="animation-on-hover">
                  8/11
                  </Button>
                    </Col>
                    <Col lg="6" md="12">
                    <CardTitle tag="h3" className="text-center">Fortra Lions</CardTitle>
                    <p className="text-info text-center">Fund Remaining</p>
                    <Button color="info" className="animation-on-hover">
                  15,000
                  </Button>
                  <p className="text-primary text-center">Total Players</p>
                  <Button color="primary" className="animation-on-hover">
                  9/11
                  </Button>
                    </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
