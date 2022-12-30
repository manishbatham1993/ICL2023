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
    <div
      className="content mainContent container"
    // style={{ minHeight: '100vh' }}
    >
      <div className="accounts-section">
        {accounts.map((account) => (
          <Card
          style={{
            width: '21rem',
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
          className="card-user minheight"
        >
          <div className="accountImage author">
            <div className="block block-one" />
            <div className="block block-two" />
            <div className="block block-three" />
            <div className="block block-four" />
            <Avatar
              className="center"
              alt={account.name}
              src={`${BASE_URL}/${account.imageUrl}`}
              sx={{ width: 200, height: 200,fontSize:"5rem"}}
            />
          </div>
            <CardBody>
              <CardTitle tag="h5" className="accountTitle">
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
        ))}
      </div>
    </div>
  )
}

export default Overview
