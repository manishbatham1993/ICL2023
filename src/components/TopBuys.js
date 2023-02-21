import React, { useContext } from 'react'
import EntityContext from '../store/entity-context'
import './overview.css'
import { Row, Col } from 'reactstrap'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab'
import Avatar from '@mui/material/Avatar'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

// constants
const BASE_PRICE = 5000
const string_text = 'No player data...'

const TopBuys = (props) => {
  const entityCtx = useContext(EntityContext)
  const players = entityCtx.players

  const soldPlayers = players.filter(
    (player) => player.auctionStatus === 'SOLD'
  )

  const topBuys = [...soldPlayers]
    .filter((player) => player.lastBid && player.lastBid.amount)
    .sort((a, b) =>
      a.lastBid.amount &&
      b.lastBid.amount &&
      a.lastBid.amount < b.lastBid.amount
        ? 1
        : -1
    )
    .slice(0, 5)

  return (
    topBuys && (
      <div className="content mainContent container">
        <Tab.Container id="left-tabs-example" defaultActiveKey="tab5">
          <Row>
            <Nav
              fill
              variant="pills"
              className=""
              style={{ flex: 'auto', marginBottom: '40px' }}
            >
              <React.Fragment>
                <Nav.Item>
                  <Nav.Link eventKey="tab5">TOP BUYS</Nav.Link>
                </Nav.Item>
              </React.Fragment>
            </Nav>
          </Row>
          <Row>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="tab5">
                  <Table
                    striped
                    hover
                    variant="dark"
                    style={{ border: '0.1rem solid #e3e3e3' }}
                  >
                    {topBuys.length != 0 ? (
                      <thead>
                        <tr>
                          <th></th>
                          <th>Player Name</th>
                          <th>Account</th>
                          <th>Team</th>
                          <th>Gender</th>
                          <th>Skill</th>
                          <th>Rating</th>
                          <th>Sold At</th>
                        </tr>
                      </thead>
                    ) : (
                      ''
                    )}
                    <tbody>
                      {topBuys.length != 0 ? (
                        topBuys.map((player) => (
                          <tr key={player?._id}>
                            <td>
                              {player.imageUrl ? (
                                <Avatar
                                  className="center"
                                  alt={player.name}
                                  src={`${BASE_URL}/${player.imageUrl}`}
                                  sx={{
                                    width: 75,
                                    height: 75,
                                    fontSize: '1rem',
                                  }}
                                />
                              ) : (
                                <Avatar
                                  className="center"
                                  alt={player.name}
                                  src={`${BASE_URL}/static/account_logo/default.png`}
                                  sx={{
                                    width: 75,
                                    height: 75,
                                    fontSize: '1rem',
                                  }}
                                />
                              )}
                            </td>
                            <td>{player.name}</td>
                            <td>{player.accountId && player.accountId.name}</td>
                            <td>{player.teamId && player.teamId.name}</td>
                            <td>{player.gender}</td>
                            <td>{player.skill}</td>
                            <td>{player.rating}</td>
                            <td>{player.lastBid && player.lastBid.amount}</td>
                          </tr>
                        ))
                      ) : (
                        <div className="string_text">{string_text}</div>
                      )}
                    </tbody>
                  </Table>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  )
}

export default TopBuys
