import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import './modal.css'
import Confetti from 'react-confetti'
import Icon from './iconstamp'
import { Col, Row } from 'react-bootstrap'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const PopupModal = ({ isOpen, player, onClose }) => {
  if (!player || !player?.status) return <></> // error handling
  return (
    <>
      <Modal show={isOpen} onHide={onClose}>
        <div className="modal-div">
          <Modal.Header style={{ justifyContent: 'center' }}>
            {player?.status === 'sold' && (
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
            {player?.status === 'unsold' && (
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
            {player?.status === 'sold' && (
              <>
                <Confetti numberOfPieces={100} width={450} height={220} />
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <Avatar
                      className="center"
                      alt={player?.name}
                      src={`${BASE_URL}/${player.image}`}
                      sx={{
                        width: 150,
                        height: 150,
                        fontSize: '5rem',
                      }}
                    />
                    <p className="name" style={{ color: 'white' }}>
                      {player?.name}
                    </p>
                  </div>

                  <div className="sold-icon">
                    <Icon />
                  </div>
                  <div>
                    <Avatar
                      className="center"
                      alt={player?.teamName}
                      src={`${BASE_URL}/${player?.teamImage}`}
                      sx={{ width: 150, height: 150, fontSize: '5rem' }}
                    />
                    <p className="name" style={{ color: 'white' }}>
                      {player?.teamName}
                    </p>
                  </div>
                </div>
                <div className="modal-price" style={{ color: 'white' }}>
                  PRICE : {player?.amount}
                </div>
              </>
            )}

            {player?.status === 'unsold' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div>
                    <Avatar
                      className="center"
                      alt={player?.name}
                      src={`${BASE_URL}/${player.image}`}
                      sx={{
                        width: 150,
                        height: 150,
                        fontSize: '5rem',
                      }}
                    />
                    <p className="name" style={{ color: 'white' }}>
                      {player?.name}
                    </p>
                    <span className="sold-text">UNSOLD</span>
                  </div>
                </div>
                <div className="modal-price" style={{ color: 'white' }}>
                  PRICE : 5000
                </div>
              </>
            )}

            {player?.status === 'round' && (
              <>
                <Row>
                  <Col>
                    <div className="round-text">ROUND {player}</div>
                    <div className="round-text">FINISHED</div>
                  </Col>
                </Row>
              </>
            )}
          </Modal.Body>
          <Modal.Footer
            style={{ justifyContent: 'center', paddingBottom: '20px' }}
          >
            <Button variant="primary" onClick={onClose}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  )
}
export default PopupModal
