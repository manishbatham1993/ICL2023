import React, { useRef, useState } from 'react'
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

  const [selectedTeam, setSelectedTeam] = useState(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  const getLinkedPlayers = (teamId) => {
    if (!teamId) return []
    const team = props.teams.find((team) => team._id === teamId)
    const accountId = team.accountId._id
    return props.players.filter((player) => player.accountId._id === accountId)
  }

  const getLinkedEmail = (playerId) => {
    if (!playerId) return ''
    const player = props.players.find((player) => player._id === playerId)
    return player.email
  }

  const accountPlayers = getLinkedPlayers(selectedTeam)
  const playerEmail = getLinkedEmail(selectedPlayer)

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
        <label htmlFor="team">Team *</label>
        <select
          id="team"
          ref={teamRef}
          onChange={(e) => {
            setSelectedTeam(e.target.value)
            setSelectedPlayer(null)
          }}
          required
        >
          <option value="" selected>
            -- Select --
          </option>
          {props.teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name} ({team.accountName})
            </option>
          ))}
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="player">Player *</label>
        <select
          id="player"
          ref={playerRef}
          onChange={(e) => {
            setSelectedPlayer(e.target.value)
          }}
          required
        >
          <option value="" selected>
            -- Select --
          </option>
          {accountPlayers.map((player) => (
            <option key={`${selectedTeam}-${player._id}`} value={player._id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          ref={emailRef}
          value={playerEmail}
          disabled
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="password">Password *</label>
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
