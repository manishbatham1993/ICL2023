import React, { useRef } from 'react'
import axios from 'axios'

import classes from './form.module.css'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const TeamOwnerForm = (props) => {
  // initialize references
  const teamRef = useRef()
  const playerRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const budgetRef = useRef()

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const payload = {
      teamId: teamRef.current.value,
      playerId: playerRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      budget: budgetRef.current.value,
    }

    // POST request to backend and then close the overlay and refresh the accounts
    const api = BASE_URL + '/api/v1/admin/teamowner/patch'
    console.log('api', api)
    console.log('PAYLOAD', payload)
    axios.post(api, payload).then((res) => {
      console.log('res', res.data)
      props.onCloseOverlay()
      props.onRefresh()
    })
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.input}>
        <label htmlFor="team">Team</label>
        <select id="team" ref={teamRef}>
          {props.teams.map((team) => (
            <option value={team._id}>{team.name}</option>
          ))}
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="player">Player</label>
        <select id="player" ref={playerRef}>
          {props.players.map((player) => (
            <option value={player._id}>{player.name}</option>
          ))}
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" ref={emailRef} required />
      </div>
      <div className={classes.input}>
        <label htmlFor="password">Password</label>
        <input id="password" type="text" ref={passwordRef} required />
      </div>
      <div className={classes.input}>
        <label htmlFor="budget">Budget</label>
        <input
          id="budget"
          type="number"
          ref={budgetRef}
          required
          defaultValue={50000}
        />
      </div>
      <button type="submit">Set</button>
    </form>
  )
}

export default TeamOwnerForm
