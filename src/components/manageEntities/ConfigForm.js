import React, { useContext, useRef, useState } from 'react'
import axios from 'axios'
import EntityContext from '../../store/entity-context'

import classes from './form.module.css'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const ConfigForm = (props) => {
  // initialize references
  const defaultBudgetRef = useRef()
  const defaultBidAmountRef = useRef()
  const playersPerTeamRef = useRef()
  const bidIncreaseRef = useRef()
  const auctionIntervalInSecRef = useRef()
  const yearRef = useRef()
  const countdownRef = useRef()
  const fixtureRoundsRef = useRef()
  const defaultLocationRef = useRef()

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const payload = {
      DEFAULT_BID_AMOUNT: defaultBidAmountRef.current.value,
      PLAYERS_PER_TEAM: playersPerTeamRef.current.value,
      BID_INCREASE: bidIncreaseRef.current.value,
      AUCTION_INTERVAL_IN_SEC: auctionIntervalInSecRef.current.value,
      YEAR: yearRef.current.value,
      COUNTDOWN: countdownRef.current.value,
      DEFAULT_LOCATION: defaultLocationRef.current.value,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    // POST request to backend and then close the overlay and refresh the accounts
    const api = BASE_URL + '/api/v1/admin/config/update'
    axios.post(api, payload, config).then((res) => {
      props.onCloseOverlay()
      props.onRefresh()
    })
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.input}>
        <label htmlFor="defaultBidAmount">DEFAULT_BID_AMOUNT</label>
        <input
          id="defaultBidAmount"
          type="number"
          ref={defaultBidAmountRef}
          defaultValue={
            props.configurations.DEFAULT_BID_AMOUNT
              ? props.configurations.DEFAULT_BID_AMOUNT
              : ''
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="bidIncrease">BID_INCREASE</label>
        <input
          id="bidIncrease"
          type="number"
          ref={bidIncreaseRef}
          defaultValue={
            props.configurations.BID_INCREASE
              ? props.configurations.BID_INCREASE
              : ''
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="auctionIntervalInSec">AUCTION_INTERVAL_IN_SEC</label>
        <input
          id="auctionIntervalInSec"
          type="number"
          ref={auctionIntervalInSecRef}
          defaultValue={
            props.configurations.AUCTION_INTERVAL_IN_SEC
              ? props.configurations.AUCTION_INTERVAL_IN_SEC
              : ''
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="playersPerTeam">PLAYERS_PER_TEAM</label>
        <input
          id="playersPerTeam"
          type="number"
          ref={playersPerTeamRef}
          defaultValue={
            props.configurations.PLAYERS_PER_TEAM
              ? props.configurations.PLAYERS_PER_TEAM
              : ''
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="year">YEAR</label>
        <input
          id="year"
          type="number"
          ref={yearRef}
          defaultValue={
            props.configurations.YEAR ? props.configurations.YEAR : ''
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="countdown">COUNTDOWN</label>
        <input
          id="countdown"
          type="datetime-local"
          ref={countdownRef}
          defaultValue={
            props.configurations.COUNTDOWN ? props.configurations.COUNTDOWN : ''
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="defaultLocation">DEFAULT_LOCATION</label>
        <input
          id="defaultLocation"
          type="text"
          ref={defaultLocationRef}
          defaultValue={
            props.configurations.DEFAULT_LOCATION
              ? props.configurations.DEFAULT_LOCATION
              : ''
          }
        />
      </div>
      <button type="submit">Set</button>
    </form>
  )
}

export default ConfigForm
