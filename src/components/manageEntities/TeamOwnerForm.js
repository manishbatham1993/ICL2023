import React, { useContext, useRef, useState } from 'react'
import axios from 'axios'
import EntityContext from '../../store/entity-context'

import classes from './form.module.css'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const TeamOwnerForm = (props) => {
  const entityCtx = useContext(EntityContext)

  // initialize references
  const teamRef = useRef()
  const playerRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const budgetRef = useRef()
  const isPlayingRef = useRef()

  const [selectedTeam, setSelectedTeam] = useState(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  const getLinkedPlayers = (teamId) => {
    if (!teamId) return []
    const team = props.teams.find((team) => team._id === teamId)
    const accountId = team.accountId._id
    return props.players
      .filter((player) => player.accountId._id === accountId)
      .sort((a, b) => {
        if (a.name < b.name) return -1
        else if (a.name > b.name) return 1
        else return 0
      })
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
      isPlaying: isPlayingRef.current.value,
    }

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    // POST request to backend and then close the overlay and refresh the accounts
    const api = BASE_URL + '/api/v1/admin/teamowner/patch'
    axios.post(api, payload, config).then((res) => {
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
          {props.teams
            .sort((a, b) => (a.accountName < b.accountName ? -1 : 1))
            .map((team) => (
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
        <label htmlFor="budget">Budget *</label>
        <input id="budget" type="number" ref={budgetRef} required />
      </div>
      <div className={classes.input}>
        <label htmlFor="isPlaying">Is Playing</label>
        <select id="isPlaying" ref={isPlayingRef}>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>
      <button type="submit">Set</button>
    </form>
  )
}

export default TeamOwnerForm
