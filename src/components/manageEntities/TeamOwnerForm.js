import React, { useCallback, useRef, useState } from 'react'
import axios from 'axios'

import classes from './form.module.css'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const TeamOwnerForm = (props) => {
  const team = props.team
  const teamOwner = props.team?.teamOwner

  // initialize references
  const emailRef = useRef()
  const passwordRef = useRef()
  const budgetRef = useRef()
  const isPlayingRef = useRef()

  const [selectedPlayer, setSelectedPlayer] = useState(
    teamOwner ? teamOwner?.playerId : ''
  )

  const getAccountPlayers = useCallback(
    (accountId) => {
      return props.players
        .filter((player) => player.accountId._id === accountId)
        .sort((a, b) => {
          if (a.name < b.name) return -1
          else if (a.name > b.name) return 1
          else return 0
        })
    },
    [props.players]
  )

  const getLinkedEmail = useCallback(
    (playerId) => {
      if (!playerId) return ''
      const player = props.players.find((player) => player._id === playerId)
      return player?.email || ''
    },
    [props.players]
  )

  const accountPlayers = getAccountPlayers(team?.accountId?._id)
  const playerEmail = getLinkedEmail(selectedPlayer)

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const payload = {
      teamId: team._id,
      playerId: selectedPlayer,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      budget: budgetRef?.current?.value,
      isPlaying: isPlayingRef?.current?.value,
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
        <label htmlFor="team">Team</label>
        <select id="team" value={team._id} disabled>
          <option value={team._id}>{team.name}</option>
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="player">Player *</label>
        <select
          id="player"
          onChange={(e) => {
            setSelectedPlayer(e.target.value)
          }}
          value={selectedPlayer}
        >
          <option value="">-- None --</option>
          {accountPlayers.map((player) => (
            <option key={`${player._id}`} value={player._id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      {selectedPlayer && (
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
      )}
      {selectedPlayer && (
        <div className={classes.input}>
          <label htmlFor="password">Password *</label>
          <input id="password" type="text" ref={passwordRef} required />
        </div>
      )}
      {selectedPlayer && (
        <div className={classes.input}>
          <label htmlFor="budget">Budget *</label>
          <input
            id="budget"
            type="number"
            ref={budgetRef}
            defaultValue={teamOwner ? teamOwner.budget : ''}
            required
          />
        </div>
      )}

      {selectedPlayer && (
        <div className={classes.input}>
          <label htmlFor="isPlaying">Is Playing</label>
          <select
            id="isPlaying"
            ref={isPlayingRef}
            defaultValue={teamOwner ? teamOwner.isPlaying : 'false'}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
      )}
      <button type="submit">Set</button>
    </form>
  )
}

export default TeamOwnerForm
