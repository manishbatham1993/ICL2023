import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import EntityContext from '../store/entity-context'
import '../index.css'
import './overview.css'
import Avatar from '@mui/material/Avatar'

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardSubtitle,
  CardText,
} from 'reactstrap'

const BASE_URL = process.env.REACT_APP_BASE_URL

const Overview = () => {
  const entityCtx = useContext(EntityContext)
  const { accounts } = entityCtx

  return (
    <div className="content mainContent container">
      <h1 style={{ marginTop: '30px' }}>ACCOUNTS</h1>
      <Row>
        {accounts.map((account) => (
          <Col key={account?._id} md="5" sm="6" lg="4">
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
                <div hidden>
                  {account.name == 'Support Staff(HR/TA/IT/Facilities)'
                    ? (account.name = 'Support Staff(HRTAITFacilities)')
                    : (account.name = account.name)}
                </div>
                <Avatar
                  className="center"
                  alt={account.name}
                  style={{
                    borderRadius: '50%',
                    width: '200px',
                    height: '200px',
                  }}
                  src={
                    account?.imageUrl
                      ? `${BASE_URL}/${account.imageUrl}`
                      : `${BASE_URL}/static/account_logo/${account.name}.png`
                  }
                  sx={{
                    width: 200,
                    height: 200,
                    fontSize: '1rem',
                    objectFit: 'contain',
                  }}
                  imgProps={{
                    style: {
                      objectFit: 'contain',
                    },
                  }}
                />
              </div>
              <CardBody style={{ minHeight: 0 }}>
                <CardTitle
                  tag="h5"
                  className="accountTitle"
                  style={{ textTransform: 'uppercase', whiteSpace: 'nowrap' }}
                >
                  {account.name}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Participants
                </CardSubtitle>
                <CardText className="playerCount">
                  {account.participantsCount}
                </CardText>
                <Link to={`/accountdetail/${account._id}`}>
                  <Button>Account Details</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Overview
