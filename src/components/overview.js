import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

import IncrementDecrement from "./IncrementDecrement";
import CircleTimer from "./CircleTimer";
import Image from 'react-bootstrap/Image'
import './overview.css'

import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';

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
  Row,
  Col,
  UncontrolledTooltip,
  CardText,
  CardFooter,
  Badge,
  Progress,
  CardSubtitle,
  image
} from "reactstrap";

const BASE_URL = process.env.REACT_APP_BASE_URL || "";
const socket = io(BASE_URL);

// constants
const DEFAULT_BID_INCREASE = 100;
const BASE_PRICE = 1000;
const TEAM_ID = "639d4a67ddfe568981cf801d";

// AUCTION_SCHEMA : {
//   state: (null/'ready'/'progress'/'completed'/)
//   teams: [<teamId>],
//   budget: {teamId: <budget>}
//   remainingPlayers : [<playerId>]
//   unsoldPlayers: [<playerId>]
//   soldPlayers: [<playerId>],
//   playerLastBid: {playerId: <bidindex>},
//   currentPlayer: {
//     id : <playerId>
//     bidAmount: <currentAmount>
//     bids : [<teamId>]
//     clock: <clock>
//   }
//   bids : [
//     {playerId : <playerId>, teamId: <teamId>, amount: <amount> }
//   ]
// }

const Overview = () => {
  console.log("---------auction--------");
  const [auctionData, setAuctionData] = useState();
  const [mappedData, setMappedData] = useState();
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [nextBidAmount, setNextBidAmount] = useState();
  // const[timer,setTimer]=useState(mappedData.clock?mappedData.clock:"")
  // console.log('timer',timer)

  // set default amount for upcoming bid
  const defaultNextBidAmount =
    auctionData && auctionData.currentPlayer
      ? auctionData.currentPlayer.bidAmount
      : null;

  useEffect(() => {
    setNextBidAmount(defaultNextBidAmount);
  }, [defaultNextBidAmount]);

  const updateMappedData = () => {
    const clock = auctionData.currentPlayer
      ? auctionData.currentPlayer.clock
      : null;
    const remBudget = auctionData.budget[TEAM_ID];
    const playerObj = auctionData.currentPlayer
      ? players.find((player) => player._id === auctionData.currentPlayer.id)
      : null;
    const currentPlayer = playerObj
      ? {
        name: playerObj.name,
        rating: playerObj.rating,
        skill: playerObj.skill,
        image: playerObj.imageUrl,
      }
      : null;
    const bidAmount = auctionData.currentPlayer
      ? auctionData.currentPlayer.bidAmount
      : null;
    const bidHistory = auctionData.currentPlayer
      ? auctionData.currentPlayer.bids //[0,1,2]
        .map((bidId) => auctionData.bids[bidId]) //[{playerId, teamId, amount}]
        .map((bid) => {
          const player = players.find(
            (player) => player._id === bid.playerId
          );
          const team = teams.find((team) => team._id === bid.teamId);
          return {
            teamName: team.name,
            teamImage: team.imageUrl,
            amount: bid.amount,
          };
        })
      : [];
    bidHistory.reverse();
    const lastBid = bidHistory.length > 0 ? bidHistory[0] : null;
    const teamStats = {};
    auctionData.teams
      .map((teamId) => teams.find((team) => team._id === teamId))
      .forEach((team) => {
        teamStats[team._id] = {
          teamName: team.name,
          batsman: 0,
          bowlers: 0,
          allRounders: 0,
          total: 0,
          budget: auctionData.budget[team._id],
        };
      });
    const previousAuctions = [];
    auctionData.soldPlayers.forEach((playerId) => {
      const bidId = auctionData.playerLastBid[playerId];
      const bid = auctionData.bids[bidId];
      const teamId = bid.teamId;
      const team = teams.find((team) => team._id === bid.teamId);
      const player = players.find((player) => player._id === playerId);
      previousAuctions.push({
        playerName: player.name,
        playerImage: player.imageUrl,
        teamName: team.name,
        teamImage: team.imageUrl,
        amount: bid.amount,
      });
      if (player.skill) {
        switch (player.skill.toLowerCase()) {
          case "batsman":
            teamStats[teamId].batsman += 1;
            break;
          case "bowler":
            teamStats[teamId].bowlers += 1;
            break;
          case "all rounder":
            teamStats[teamId].allRounders += 1;
            break;
          default:
            console.log("skill", player.skill, "not present");
        }
      }
      teamStats[bid.teamId].total += 1;
    });
    setMappedData({
      clock,
      remBudget,
      currentPlayer,
      bidAmount,
      lastBid,
      bidHistory,
      teamStats,
      previousAuctions,
    });
  };

  const updateData = () => {
    axios
      .get(BASE_URL + "/api/v1/auction/data")
      .then((res) => {
        if (res.data.status === "ok") {
          setAuctionData(res.data.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
    axios.get(BASE_URL + "/api/v1/team").then((res) => {
      setTeams(res.data.teams);
    });
    axios.get(BASE_URL + "/api/v1/player").then((res) => {
      setPlayers(res.data.players);
    });
  };

  const makeBid = (teamId) => {
    axios
      .post(BASE_URL + "/api/v1/auction/bid", {
        playerId: auctionData.currentPlayer.id,
        teamId: teamId,
        amount: nextBidAmount,
      })
      .then((res) => {
        console.log("posting-bid", res);
      });
  };

  // update data and initialize socket functions
  useEffect(() => {
    console.log("--------use-effect---------");
    updateData();
    socket.on("connect", () => {
      console.log("socket connected");
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });
    socket.on("event", (payload) => {
      console.log("event:", payload);
      setAuctionData(payload.data);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("event");
    };
  }, []);

  useEffect(() => {
    if (teams.length > 0 && players.length > 0 && auctionData) {
      updateMappedData();
    }
  }, [teams, players, auctionData]);

  return (
    mappedData && (
      <div className="content mainContent container" style={{ minHeight: '200vh' }}>


        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Nav fill variant="pills" className="" style={{ flex: 'auto', marginBottom: '40px' }}>
              <Nav.Item>
                <Nav.Link eventKey="first">ACCOUNTS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">TO BE AUCTIONED</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">SOLD PLAYERS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="forth">TOP BUYS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">UNSOLD</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <Row>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Row md="12">
                    <Col md="4">
                      <Card
                        style={{
                          width: '18rem'
                        }}
                      >
                        <div className="accountImage"><Image
                          rounded="true"
                          roundedCircle="true"
                          alt="Sample"
                          src="https://picsum.photos/100/100"
                        /></div>

                        <CardBody>
                          <CardTitle tag="h5" className="accountTitle">
                            Fortra
                          </CardTitle>
                          <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                          >
                            Player Count
                          </CardSubtitle>
                          <CardText className="playerCount">
                            100
                          </CardText>
                          <div className="playerSummary">
                            <h4>Batsman <span>50</span></h4>
                            <h4>Bowlers <span>25</span></h4>
                            <h4>All Rounders <span>25</span></h4>

                          </div>
                          <a href="/accountdetail">
                          <Button>
                              Get Details                        
                          </Button>
                          </a>
                        </CardBody>
                      </Card>
                    </Col>

                    <Col md="4">
                      <Card
                        style={{
                          width: '18rem'
                        }}
                      >
                        <div className="accountImage"><Image
                          rounded="true"
                          roundedCircle="true"
                          alt="Sample"
                          src="https://picsum.photos/100/100"
                        /></div>

                        <CardBody>
                          <CardTitle tag="h5" className="accountTitle">
                            Prosoft
                          </CardTitle>
                          <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                          >
                            Player Count
                          </CardSubtitle>
                          <CardText className="playerCount">
                            100
                          </CardText>
                          <div className="playerSummary">
                            <h4>Batsman <span>50</span></h4>
                            <h4>Bowlers <span>25</span></h4>
                            <h4>All Rounders <span>25</span></h4>

                          </div>
                          <Button>
                            Get Details
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>


                    <Col md="4">
                      <Card
                        style={{
                          width: '18rem'
                        }}
                      >
                        <div className="accountImage"><Image
                          rounded="true"
                          roundedCircle="true"
                          alt="Sample"
                          src="https://picsum.photos/100/100"
                        /></div>

                        <CardBody>
                          <CardTitle tag="h5" className="accountTitle">
                            A10
                          </CardTitle>
                          <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                          >
                            Player Count
                          </CardSubtitle>
                          <CardText className="playerCount">
                            100
                          </CardText>
                          <div className="playerSummary">
                            <h4>Batsman <span>50</span></h4>
                            <h4>Bowlers <span>25</span></h4>
                            <h4>All Rounders <span>25</span></h4>

                          </div>
                          <Button>
                            Get Details
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>

                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Table striped hover variant="dark" style={{border: '0.1rem solid #e3e3e3'}}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Player Name</th>
                        <th>Account</th>
                        <th>Skill</th>
                        <th>Base Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><Image
                          rounded="true"
                          roundedCircle="true"
                          alt="Sample"
                          src="https://picsum.photos/50/50"
                        /></td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                      <td><Image
                          rounded="true"
                          roundedCircle="true"
                          alt="Sample"
                          src="https://picsum.photos/50/50"
                        /></td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                      <td><Image
                          rounded="true"
                          roundedCircle="true"
                          alt="Sample"
                          src="https://picsum.photos/50/50"
                        /></td>
                        <td>Larry</td>
                        <td>Thornton</td>
                        <td>@twitter</td>
                        <td>10000</td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <Table striped hover variant="dark" style={{border: '0.1rem solid #e3e3e3'}}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Player Name</th>
                        <th>Account</th>
                        <th>Skill</th>
                        <th>Base Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>                    
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Larry</td>
                        <td>Thornton</td>
                        <td>@twitter</td>
                        <td>10000</td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab.Pane>
                <Tab.Pane eventKey="forth">
                  <Table striped hover variant="dark" style={{border: '0.1rem solid #e3e3e3'}}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Player Name</th>
                        <th>Account</th>
                        <th>Skill</th>
                        <th>Base Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Larry</td>
                        <td>Thornton</td>
                        <td>@twitter</td>
                        <td>10000</td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab.Pane>
                <Tab.Pane eventKey="fifth">
                  <Table striped hover variant="dark" style={{border: '0.1rem solid #e3e3e3'}}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Player Name</th>
                        <th>Account</th>
                        <th>Skill</th>
                        <th>Base Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Larry</td>
                        <td>Thornton</td>
                        <td>@twitter</td>
                        <td>10000</td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>






      </div>
    )
  );
};

export default Overview;
