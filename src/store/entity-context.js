import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const EntityContext = React.createContext({
  teams: [],
  players: [],
  accounts: [],
})

export const EntityContextProvider = (props) => {
  const [accounts, setAccounts] = useState([])
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])

  const updateAccounts = () => {
    const api = BASE_URL + '/api/v1/account'
    axios.get(api).then((res) => {
      if (res.data.status === 'ok') {
        setAccounts(res.data.accounts)
      }
    })
  }
  const updatePlayers = () => {
    const api = BASE_URL + '/api/v1/player'
    axios.get(api).then((res) => {
      if (res.data.status === 'ok') {
        setPlayers(res.data.players)
      }
    })
  }
  const updateTeams = () => {
    const api = BASE_URL + '/api/v1/team'
    axios.get(api).then((res) => {
      if (res.data.status === 'ok') {
        setTeams(res.data.teams)
      }
    })
  }

  useEffect(() => {
    updateAccounts()
    updatePlayers()
    updateTeams()
  }, [])

  const contextValue = {
    accounts,
    teams,
    players,
  }
  return (
    <EntityContext.Provider value={contextValue}>
      {props.children}
    </EntityContext.Provider>
  )
}

export default EntityContext
