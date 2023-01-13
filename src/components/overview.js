import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import EntityContext from '../store/entity-context'
import CircleTimer from './CircleTimer'
import Image from 'react-bootstrap/Image'
import './overview.css'
import Avatar from '@mui/material/Avatar'

import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab'

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
  image,
} from 'reactstrap'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''
const socket = io(BASE_URL)

const Overview = () => {
  const entityCtx = useContext(EntityContext)
  const teams = entityCtx.teams
  const players = entityCtx.players
  const accounts = entityCtx.accounts

  return (
    <div className="content mainContent container">
      <h1 style={{ marginTop: '30px' }}>ACCOUNTS</h1>
      <Row>
        {accounts.map((account) => (
          <Col md="5" sm="6" lg="4">
            <Card
              style={{
                // width: '18rem',
                paddingTop: '20px',
                paddingBottom: '20px',
              }}
              className="card-user"
            >
              <div className="author" style={{ marginTop: 0 }}>
                <div className="block block-one" />
                <div className="block block-two" />
                <div className="block block-three" />
                <div className="block block-four" />
                {/* {console.log(
                  `localhost:3000/static/account_logo/${account.name}.png`
                )} */}
                <Avatar
                  className="center"
                  alt={account.name}
                  src={`${BASE_URL}/static/account_logo/${account.name}.png`}
                  sx={{ width: 200, height: 200, fontSize: '5rem' }}
                />
              </div>
              <CardBody style={{ minHeight: 0 }}>
                <CardTitle
                  tag="h5"
                  className="accountTitle"
                  style={{ textTransform: 'uppercase' }}
                >
                  {account.name}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Participants
                </CardSubtitle>
                <CardText className="playerCount">
                  {account.participantsCount}
                </CardText>
                <a href={`/accountdetail/${account._id}`}>
                  <Button>Account Details</Button>
                </a>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Overview
