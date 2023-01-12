import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import './modal.css'
import Confetti from 'react-confetti'
import Icon from './iconstamp'
import { Col, Row } from 'react-bootstrap'

function Showmodal({ status, showpop = false, data, setauctionflag }) {
  console.log(data)
  const BASE_URL = process.env.REACT_APP_BASE_URL || ''
  const [show, setShow] = useState({ showpop })
  // console.log(setauctionflag)
  const handleClose = () => (setShow(false), setauctionflag())
  const handleShow = () => setShow({ showpop })
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <div className="modal-div">
          <Modal.Header style={{ justifyContent: 'center' }}>
            {status === 'sold' && (
              <Modal.Title
                style={{
                  fontSize: '40px',
                  fontFamily: 'fantasy',
                  color: 'white',
                }}
              >
                CONGRATULATIONS
              </Modal.Title>
            )}
            {status === 'unsold' && (
              <Modal.Title
                style={{
                  fontSize: '40px',
                  fontFamily: 'fantasy',
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                HANG ON FOR COMING ROUNDS
              </Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            {status === 'sold' && (
              <>
                <Confetti numberOfPieces={100} width={450} height={220} />
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <Avatar
                      className="center"
                      alt={data.playerName}
                      src={`${BASE_URL}/${data.playerImage}`}
                      sx={{ width: 150, height: 150, fontSize: '5rem' }}
                    />
                    <p className="name" style={{ color: 'white' }}>
                      {data.playerName}
                    </p>
                  </div>

                  <div className="sold-icon">
                    <Icon />
                  </div>
                  <div>
                    <Avatar
                      className="center"
                      alt={data.teamName}
                      src={`${BASE_URL}/${data.teamImage}`}
                      sx={{ width: 150, height: 150, fontSize: '5rem' }}
                    />
                    <p className="name" style={{ color: 'white' }}>
                      {data.teamName}
                    </p>
                  </div>
                </div>
                <div className="modal-price" style={{ color: 'white' }}>
                  PRICE : {data.amount}
                </div>
              </>
            )}

            {status === 'unsold' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div>
                    <Avatar
                      className="center"
                      alt={data.name}
                      src={`${BASE_URL}/${data.imageUrl}`}
                      sx={{ width: 150, height: 150, fontSize: '5rem' }}
                    />
                    <p className="name" style={{ color: 'white' }}>
                      {data.name}
                    </p>
                    <span className="sold-text">UNSOLD</span>
                  </div>
                </div>
                <div className="modal-price" style={{ color: 'white' }}>
                  PRICE : 5000
                </div>
              </>
            )}

            {status === 'round' && (
              <>
                <Row>
                  <Col>
                    <div className="round-text">ROUND {data}</div>
                    <div className="round-text">FINISHED</div>
                  </Col>
                </Row>
              </>
            )}
          </Modal.Body>
          <Modal.Footer
            style={{ justifyContent: 'center', paddingBottom: '20px' }}
          >
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  )
}
export default Showmodal
